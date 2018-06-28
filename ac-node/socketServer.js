const net = require("net");
const server = new net.Server();

server.on("connection", socket => {
  socket.setEncoding("utf8");

  socket.on("data", data => {
    console.log("Received: ", data);
  });

  socket.on("error", () => console.log("Socket error!"));
});

server.listen(9954, () => {
  console.log("Server is listening...");
});
