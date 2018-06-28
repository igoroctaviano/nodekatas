const events = require("events");
const eventEmitter = new events.EventEmitter();

/* console.log("1");

const myEventHandler = () => {
  console.log("2");
  console.log("Handling event!");
}

console.log("3");

eventEmitter.on("myCustomEvent", myEventHandler);
eventEmitter.emit("myCustomEvent"); */

module.exports = eventEmitter;