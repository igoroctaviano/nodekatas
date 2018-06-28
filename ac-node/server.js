const http = require("http");
const fs = require("fs");

const routes = require("./routes");
const eventEmitter = require("./events");
const socket = require("./socket");

const hostname = "127.0.0.1";
const port = 3000;

const myEventHandler = file => console.log(`Done reading the file ${file}.`);

eventEmitter.on("myCustomEvent", myEventHandler);

http.createServer(routes.handler).listen(port, hostname, () => {
  // socket.write(request.url, );
  console.log(`Server running at http://${hostname}:${port}/`);
});
