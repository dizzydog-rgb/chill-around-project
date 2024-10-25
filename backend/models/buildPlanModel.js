const db = require("../config/database");

// 新增旅行計畫和範例景點的模組函數
exports.addSchedule = (planName, startDate, endDate, emailid) => {
  return new Promise((resolve, reject) => {
    // 新增旅行計畫的 SQL 語句
    const scheduleQuery = `
      INSERT INTO schedule (sch_name, edit_date, end_date, emailid)
      VALUES (?, ?, ?, ?);
    `;

    // 執行插入旅行計畫
    db.exec(scheduleQuery, [planName, startDate, endDate, emailid], (error, results, fields) => {
      if (error) {
        console.error("Cannot add schedule or query error:", error);
        return reject(new Error("Cannot add schedule or query error"));
      }

      // 取得新插入的 sch_id
      const newScheduleId = results.insertId;
      if (!newScheduleId) {
        return reject(new Error("No schedule ID returned after insert"));
      }

      console.log("新增旅行計畫成功，行程 ID:", newScheduleId);

      // 插入範例景點的 SQL 語句
      const detailQuery = `
        INSERT INTO schedule_details (emailid, sch_id, sch_day, sch_order, sch_spot, sch_paragh)
        VALUES (?, ?, ?, ?, ?, ?);
      `;

      // 預設的範例景點資料
      const detailValues = [
        1,                   // emailid 預設為 1，之後帶入登入的會員ID
        newScheduleId,       // sch_id 等於剛新增的 schedule 的 ID
        1,                   // sch_day 預設為 1
        1,                   // sch_order 預設為 1
        "台北101",           // sch_spot 預設為 "請填入景點名稱"
        "請填入景點敘述"      // sch_paragh 預設為 "請填入景點敘述"
      ];

      // 執行插入範例景點
      db.exec(detailQuery, detailValues, (detailError, detailResults, detailFields) => {
        if (detailError) {
          console.error("Cannot add schedule detail or query error:", detailError);
          return reject(new Error("Cannot add schedule detail or query error"));
        }

        console.log("範例景點插入成功，行程 ID:", newScheduleId);
        resolve(newScheduleId);  // 返回插入的 schedule ID
      });
    });
  });
};


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

      if (results) {
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
    SELECT s.*, sd.*, si.photo_one,si.site_id
    FROM schedule s
    JOIN schedule_details sd ON s.sch_id = sd.sch_id
    LEFT JOIN sites si ON sd.sch_spot = si.site_name
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

// 新增景點至特定編號行程的模組函數
// emailid待更新
exports.addSiteToSchedule = (sch_id, sch_day, sch_spot, sch_paragh) => {
  return new Promise((resolve, reject) => {
    const query = `
    INSERT INTO schedule_details (emailid, sch_id, sch_day, sch_spot, sch_paragh, sch_order)
    VALUES (?, ?, ?, ?, ?, (SELECT COALESCE(MAX(sd.sch_order), 0) + 1 FROM schedule_details AS sd WHERE sd.sch_id = ? AND sd.sch_day = ?));
  `;
    db.exec(
      query,
      [1, sch_id, sch_day, sch_spot, sch_paragh, sch_id, sch_day],
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
