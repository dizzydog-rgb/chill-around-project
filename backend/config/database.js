const mysql = require("mysql2");

exports.exec = (sql, data, callback) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chill_around_test",
    multipleStatements: true,
  });
  connection.connect();

  connection.query(sql, data, function (error, results, fields) {
    if (error) {
      console.log("Error connecting to the database:", error);
    }
    console.log("Connected to the database.");
    callback(results, fields);
  });
  connection.end();
};
