const mysql = require("mysql");

const config = {
  host: "192.168.0.68", // "localhost",
  user: "root",
  password: "root",
  database: "nodeIntroduction" // "mydb"
};

function Database() {
  this.createConnection = () => {
    var connection = mysql.createConnection(config);
    return connection;
  };
  return this;
}

module.exports = Database;
