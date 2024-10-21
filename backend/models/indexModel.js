const db = require("../config/database");

// hero img sql
exports.findHero = (hero) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM schedule_info"; 

        console.log("觀看這行"+ db); // 在此行查看 db 的內容
        db.exec(query, [hero], (err, results) => {
      if (err) {
        return reject(err);
      }
      // 如果查詢結果有資料，返回第一筆
    //   resolve(results[0]);
      resolve(results);
     
    });
  });
};

// tag sql
exports.findTag = (name) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM all_tag ORDER BY RAND() LIMIT 5"; 

        console.log("觀看這行"+ db); // 在此行查看 db 的內容
        db.exec(query, [name], (err, results) => {
      if (err) {
        return reject(err);
      }
      // 如果查詢結果有資料，返回第一筆
    //   resolve(results[0]);
      resolve(results);
     
    });
  });
};