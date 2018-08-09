FROM python:3.6
COPY . /app
RUN cd /app && npm install
ENTRYPOINT ["node", "/app/app.js"]

EXPOSE 30002