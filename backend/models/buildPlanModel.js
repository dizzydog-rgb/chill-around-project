const db = require("../config/database");

// 獲取所有行程的模組函數
exports.findAllSchedule = () => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
    s.*,
    sd.sch_spot,
    si.photo_one
    FROM
        schedule s
        INNER JOIN schedule_details sd ON s.sch_id = sd.sch_id
        INNER JOIN sites si ON sd.sch_spot = si.site_name
    WHERE 
        sd.detail_id = (
            SELECT MIN(detail_id) 
            FROM schedule_details 
            WHERE sch_id = s.sch_id
        )
    ORDER BY s.sch_id;;
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

// 刪除取特定編號行程的模組函數
exports.dropScheduleById = (scheduleId) => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM schedule WHERE sch_id = ?
    `;
    db.exec(query, [scheduleId], (error, results, fields) => {
      if (error) {
        console.error("Query error:", error);
        return reject(new Error("Query error"));
      }

      // 檢查受影響的行數是否大於0
      if (results.affectedRows > 0) {
        resolve({ message: "Schedule deleted successfully" });
      } else {
        console.error("No schedule deleted");
        reject(new Error("No schedule found to be deleted"));
      }
    });
  });
};

// 獲取取特定編號行程的模組函數
exports.findScheduleById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT s.*, sd.*, si.photo_one
    FROM schedule s
    JOIN schedule_details sd ON s.sch_id = sd.sch_id
    JOIN sites si ON sd.sch_spot = si.site_name
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
    SELECT tag_name, tag_id
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
    SELECT tag_name, tag_id
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

// 更新特定景點的資料的模組函數
exports.updateSiteDetailById = (detail_id, sch_spot, sch_paragh) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE schedule_details
      SET sch_spot = ?, sch_paragh = ?
      WHERE detail_id = ?;
    `;

    db.exec(
      query,
      [sch_spot, sch_paragh, detail_id],
      (error, results, fields) => {
        if (results) {
          resolve(results);
        } else {
          console.error("No results found or query error");
          reject(new Error("No results found or query error"));
        }
      }
    );
  });
};

// 更新特定景點的標籤關聯的模組函數
exports.updateSiteTags = (sch_spot, tags) => {
  return new Promise((resolve, reject) => {
    db.exec(
      "SELECT site_id FROM sites WHERE site_name = ?",
      [sch_spot],
      (err, results, fields) => {
        if (err) {
          console.error("Query error:", err);
          reject(new Error("Query error"));
          return;
        }
        if (results.length === 0) {
          console.error("site_id not found for site_name:", sch_spot);
          reject(new Error("site_id not found"));
          return;
        }
        const siteId = results[0].site_id;

        // 先刪除當前 sch_id 的所有標籤
        const deleteQuery = `
        DELETE FROM site_tag
        WHERE site_id = ?;
      `;

        db.exec(deleteQuery, [siteId], (error, results, fields) => {
          if (results) {
            resolve(results);
          } else {
            console.error("Delete fail or query error");
            reject(new Error("Delete fail or query error"));
          }

          // 插入新的標籤關聯
          if (tags.length === 0) {
            return resolve(); // 如果沒有標籤直接返回
          }

          const insertQuery = `
          INSERT INTO site_tag (site_id, tag_id)
            VALUES ?
            ON DUPLICATE KEY UPDATE site_id = VALUES(site_id), tag_id = VALUES(tag_id);
        `;

          const values = tags.map((tagId) => [siteId, tagId]); // 構建值列表

          db.exec(insertQuery, [values, sch_spot], (error, results, fields) => {
            if (results) {
              resolve(results);
            } else {
              console.error("Insert tag fail or query error");
              reject(new Error("Insrrt tag fail or query error"));
            }
          });
        });
      }
    );
  });
};

// 檢查景點是否存在於 sites 資料表的模組函數
exports.checkSiteExists = (sch_spot) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT COUNT(*) AS count FROM sites WHERE site_name = ?;
    `;
    db.exec(query, [sch_spot], (error, results, fields) => {
      if (error) {
        console.error("Error checking site existence:", error);
        return reject(error);
      }
      const count = results[0].count;
      resolve(count > 0); // 如果 count 大於 0，表示景點存在
    });
  });
};

// 添加景點至特定編號行程的模組函數
exports.addSiteToSchedule = (sch_id, sch_day, sch_spot, sch_paragh) => {
  return new Promise((resolve, reject) => {
    const query = `
    INSERT INTO schedule_details (sch_id, sch_day, sch_spot, sch_paragh, sch_order)
    VALUES (?, ?, ?, ?, (SELECT COALESCE(MAX(sd.sch_order), 0) + 1 FROM schedule_details AS sd WHERE sd.sch_id = ? AND sd.sch_day = ?));
  `;
    db.exec(
      query,
      [sch_id, sch_day, sch_spot, sch_paragh, sch_id, sch_day],
      (error, results, fields) => {
        if (results) {
          resolve(results);
        } else {
          console.error("Insert site fail or query error");
          reject(new Error("Insert site fail or query error"));
        }
      }
    );
  });
};

// 刪除特定景點的資料的模組函數
exports.dropSiteDetailById = (detail_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM schedule_details WHERE detail_id = ?
    `;

    db.exec(query, [detail_id], (error, results, fields) => {
      if (results) {
        resolve(results);
      } else {
        console.error("No site to delete or query error");
        reject(new Error("No site to delete or query error"));
      }
    });
  });
};
