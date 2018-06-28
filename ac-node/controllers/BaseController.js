const fs = require("fs");

const eventEmitter = require("../events");
const employeeService = require("../employeeService");
const socket = require("../socket");

const render = (path, file) => {
  return (request, response) => {
    fs.readFile(file, (err, data) => {
      eventEmitter.emit("myCustomEvent", file);

      socket.write(`User accessed ${file}!`, path);

      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html");
      response.write(data);
      response.end();
    });
  };
};

module.exports = {
  home: render("Home", "index.html"),
  test: render("Test", "test.html"),
  createTable: (request, response) => {
    employeeService.createTable(result => {
      response.end(JSON.stringify(result));
    });
  },
  insertEmployee: (request, response) => {
    employeeService.insertEmployee(result => {
      response.end(JSON.stringify(result));
    });
  },
  insertMultipleEmployee: (request, response) => {
    employeeService.insertMultipleEmployees(result => {
      response.end(JSON.stringify(result));
    });
  },
  selectEmployees: (request, response) => {
    employeeService.selectEmployees(result => {
      response.end(JSON.stringify(result));
    });
  }
};
