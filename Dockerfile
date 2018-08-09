FROM node
COPY . /app
RUN cd /app && npm install
ENTRYPOINT ["node", "/app/app.js"]

EXPOSE 30002