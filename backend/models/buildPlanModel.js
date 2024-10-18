const db = require("../config/database");

// 獲取所有行程的模組函數
exports.findAllSchedule = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM `schedule`";
    db.exec(query, [], (results, fields) => {
      if (results) {
        resolve(results);
      } else {
        console.error("No results found or query error");
        reject(new Error("No results found or query error"));
      }
    });
  });
};

// 獲取取特定編號行程的模組函數
exports.findScheduleById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM `schedule` WHERE sch_id = ?";
    db.exec(query, [], (results, fields) => {
      if (results) {
        resolve(results);
      } else {
        console.error("No results found or query error");
        reject(new Error("No results found or query error"));
      }
    });
  });
};
