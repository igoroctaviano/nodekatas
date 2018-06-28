const net = require("net");

let isConnected = false;
const client = new net.Socket();

client.on("data", data => {
  console.log("Received: " + data);
});

client.on("close", () => {
  isConnected = false;
  console.log("Connection closed.");
});

client.on("error", err => {
  console.log(err);
  isConnected = false;
  if (err.code === "EPIPE") {
    // you can reconnect, do nothing.
  }
});

const SocketClient = {
  connect: () => {
    client.connect(9954, "127.0.0.1", () => {
      isConnected = true;
      console.log("Connected");
    });
  },
  write: function (url, metodo) {
    if (this.isConnected()) {
      client.write(`URL: ${url} Metodo: ${metodo}`);
    } else {
      client.destroy();
      console.log("Reconnecting...");
      this.connect();
    }
  },
  isConnected: () => isConnected
};

SocketClient.connect();
module.exports = SocketClient;
