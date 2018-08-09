FROM node
COPY . /app
RUN cd /app && npm install
WORKDIR /app
ENTRYPOINT ["node", "./app.js"]

EXPOSE 30002
