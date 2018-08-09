FROM node
COPY . /app
RUN cd /app && npm install
ENTRYPOINT ["cd", "/app", "&&", "node", "./app.js"]

EXPOSE 30002