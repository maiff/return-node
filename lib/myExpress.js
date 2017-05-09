const http = require('http')

var EventEmitter = require('events').EventEmitter
const parseUrl = require('parseurl')
const finalhandler = require('finalhandler')
const merge = require('./merge')

/* istanbul ignore next */
var defer = typeof setImmediate === 'function'
  ? setImmediate
  : function (fn) { process.nextTick(fn.bind.apply(fn, arguments)) }

// function returnNotFound (res) {
//   res.writeHead(404, {'Content-Type': 'text/plain'})
//   res.write('404 Not Found\n')
//   res.end()
// }
var proto = {}

module.exports = function createServer () {
  function app (req, res, next) { app.handle(req, res, next) }
  merge(app, proto)
  merge(app, EventEmitter.prototype)
  app.route = '/'
  app.stack = []
  return app
}

proto.listen = function () {
  var server = http.createServer(this)
  return server.listen.apply(server, arguments)
}

proto.use = function (router, fn) {
  var handle = fn
  var path = router

  if (typeof router !== 'string') {
    handle = router
    path = '/'
  }

  // wrap sub-apps
  if (typeof handle.handle === 'function') {
    var server = handle
    server.route = path
    handle = function (req, res, next) {
      server.handle(req, res, next)
    }
  }

  // wrap vanilla http.Servers
  if (handle instanceof http.Server) {
    handle = handle.listeners('request')[0]
  }

  if (path[path.length - 1] === '/') {
    path = path.slice(0, -1)
  }
  this.stack.push({ route: path, handle: handle })
  return this
}

proto.get = function (router, fn) {
  if (typeof router !== 'string') {
    fn = router
    router = '/'
  }
  this.use(router, function (req, res, next) {
    if (req.method === 'GET') {
      fn(req, res, next)
    } else {
      next()
    }
  })
}
proto.post = function (router, fn) {
  if (typeof router !== 'string') {
    fn = router
    router = '/'
  }
  this.use(router, function (req, res, next) {
    if (req.method === 'POST') {
      fn(req, res, next)
    } else {
      next()
    }
  })
}

proto.handle = function (req, res, out) {
  var stack = this.stack
  var index = 0
  var done = out || finalhandler(req, res)
  // console.log(out)

  var protohost = getProtohost(req.url) || ''
  var removed = ''
  var slashAdded = false

  // store the original URL
  req.originalUrl = req.originalUrl || req.url

  function next (err) {
    if (slashAdded) {
      req.url = req.url.substr(1)
      slashAdded = false
    }

    if (removed.length !== 0) {
      req.url = protohost + removed + req.url.substr(protohost.length)
      removed = ''
    }
    var layer = stack[index++]

     // all done
    if (!layer) {
      defer(done, err)
      return
    }
     // route data
    var path = parseUrl(req).pathname || '/'
    var route = layer.route

    // skip this layer if the route doesn't match
    if (path.toLowerCase().substr(0, route.length) !== route.toLowerCase()) {
      return next(err)
    }

    // skip if route match does not border "/", ".", or end
    var c = path[route.length]
    if (c !== undefined && c !== '/' && c !== '.') {
      return next(err)
    }

    // trim off the part of the url that matches the route
    if (route.length !== 0 && route !== '/') {
      removed = route
      req.url = protohost + req.url.substr(protohost.length + removed.length)

     // ensure leading slash
      if (!protohost && req.url[0] !== '/') {
        req.url = '/' + req.url
        slashAdded = true
      }
    }

    call(layer.handle, route, err, req, res, next)
  }

  next()
}

function call (handle, route, err, req, res, next) {
  var arity = handle.length
  var error = err
  var hasError = Boolean(err)
  try {
    if (hasError && arity === 4) {
    // error-handling middleware
      handle(err, req, res, next)
      return
    } else if (!hasError && arity < 4) {
      // request-handling middleware
      handle(req, res, next)
      return
    }
  } catch (e) {
    // replace the error
    error = e
  }

    // continue
  next(error)
}

function getProtohost (url) {
  if (url.length === 0 || url[0] === '/') {
    return undefined
  }

  var searchIndex = url.indexOf('?')
  var pathLength = searchIndex !== -1
    ? searchIndex
    : url.length
  var fqdnIndex = url.substr(0, pathLength).indexOf('://')

  return fqdnIndex !== -1
    ? url.substr(0, url.indexOf('/', 3 + fqdnIndex))
    : undefined
}
// //module.exports = createServer;
// var app=createServer();
// var app2=createServer();
// app.listen(8080);

// app.use(function(req,res,next){
// console.log(req.method);
// //res.end();
// next()
// })

// app.get('/get',function(req,res,next){
// console.log("test_get");

// res.end();
// })

// app2.get('/dd',function(req,res,next){
// console.log("test_get2");

// res.end();
// })
// app.use(app2)

// app.post('/get',function(req,res){
// console.log("test_post");

// res.end();
// })