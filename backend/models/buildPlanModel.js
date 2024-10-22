const db = require("../config/database");

// 獲取所有行程的模組函數
exports.findAllSchedule = () => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
    s.*,
    (
        SELECT si.photo_one
        FROM sites si
        ORDER BY RAND()
        LIMIT 1
    ) AS photo_one
    FROM schedule s;
    `;
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
    SELECT s.*, sd.* ,
    (
        SELECT si.photo_one
        FROM sites si
        ORDER BY RAND()
        LIMIT 1
    ) AS photo_one
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

// 獲取所有標籤的模組函數
exports.findAllTag = () => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT tag_name 
    FROM all_tag
    LIMIT 18
  `;
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

// 獲取特定編號景點的標籤的模組函數
exports.findTagBySiteName = (siteName) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT tag_name 
    FROM all_tag 
    WHERE tag_id IN (
        SELECT tag_id 
        FROM site_tag
        WHERE site_id IN (
            SELECT site_id 
            FROM sites 
            WHERE site_name = ?
        )
    );
  `;
    db.exec(query, [siteName], (error, results, fields) => {
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
