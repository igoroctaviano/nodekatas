const Database = require("./modules/database/Database");
const database = new Database();

module.exports = {
  createTable: callback => {
    console.log("Creating table...");
    const connection = database.createConnection();
    connection.connect(err => {
      if (err) throw err;

      const sql =
        "CREATE TABLE employee (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
      connection.query(sql, (err, result) => {
        if (err) throw err;
        callback(result);
        console.log("Table created: ", result);
      });
    });
  },
  insertEmployee: callback => {
    console.log("Inserting employee...");
    var connection = database.createConnection();
    connection.connect(err => {
      var sql =
        "INSERT INTO employee (name, address) VALUES ('Company Inc', 'Highway 37')";
      connection.query(sql, (err, result) => {
        if (err) throw err;
        callback(result);
        console.log("First record inserted!");
      });
    });
  },
  insertMultipleEmployees: callback => {
    console.log("Inserting multiples employee...");
    const connection = database.createConnection();
    connection.connect(err => {
      const sql = "INSERT INTO employee (name, address) VALUES ?";
      const values = [
        ["John", "Highway 71"],
        ["Peter", "Lowstreet 4"],
        ["Amy", "Apple st 652"],
        ["Hannah", "Mountain 21"],
        ["Michael", "Valley 345"],
        ["Sandy", "Ocean blvd 2"],
        ["Betty", "Green Grass 1"],
        ["Richard", "Sky st 331"],
        ["Susan", "One way 98"],
        ["Vicky", "Yellow Garden 2"],
        ["Ben", "Park Lane 38"],
        ["William", "Central st 954"],
        ["Chuck", "Main Road 989"],
        ["Viola", "Sideway 1633"]
      ];
      connection.query(sql, [values], (err, result) => {
        if (err) throw err;
        callback(result);
        console.log("Number of records inserted: " + result.affectedRows);
      });
    });
  },
  selectEmployees: callback => {
    console.log("selecting employee");
    var connection = database.createConnection();
    connection.connect(err => {
      connection.query(
        "SELECT name, address FROM employee",
        (err, result, fields) => {
          if (err) throw err;
          callback(result);
          console.log(result);
        }
      );
    });
  }
};
