const db = require("../config/database");

// 獲取所有行程的模組函數
exports.findAllSchedule = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM `schedule`";
    db.exec(query, [], (error, results, fields) => {
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
    const query = `
    SELECT s.*, sd.* 
    FROM schedule s
    JOIN schedule_details sd ON s.sch_id = sd.sch_id
    WHERE s.sch_id = ?;
  `;
    db.exec(query, [id], (error, results, fields) => {
      if (results) {
        resolve(results);
      } else {
        console.error("No results found or query error");
        reject(new Error("No results found or query error"));
      }
    });
  });
};

// 添加景點至特定編號行程的模組函數
exports.addSiteToSchedule = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
    SQL
  `;
    db.exec(query, [id], (error, results, fields) => {
      if (results) {
        resolve(results);
      } else {
        console.error("No results found or query error");
        reject(new Error("No results found or query error"));
      }
    });
  });
};
