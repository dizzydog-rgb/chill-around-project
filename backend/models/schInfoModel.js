const db = require("../config/database");

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

//取得卡片行程資料、標籤、景點
exports.getScheduleCardData = (regions, tags) => {
  console.log("地區:", regions);
  console.log("標籤:", tags);
  return new Promise((resolve, reject) => {
    let query = `
      SELECT 
          s.sch_id,
          s.sch_name,
          s.edit_date,
          si.photo_one,
          si.photo_two,
          si.site_add,
          si.site_city,
          GROUP_CONCAT(DISTINCT t.tag_name SEPARATOR ', ') AS tags
      FROM 
          schedule s
      JOIN 
          schedule_tag st ON s.sch_id = st.sch_id
      JOIN 
          all_tag t ON st.tag_id = t.tag_id
      LEFT JOIN (
          SELECT 
              sd.sch_id,
              sd.sch_spot,
              ROW_NUMBER() OVER(PARTITION BY sd.sch_id ORDER BY sd.sch_order ASC) AS rn  
          FROM 
              schedule_details sd
      ) first_spot ON first_spot.sch_id = s.sch_id AND first_spot.rn = 1
      LEFT JOIN 
          sites si ON si.site_name = first_spot.sch_spot
    `;

    const parameters = [];
    let whereClauses = []; // 儲存 WHERE 條件

    // 地區篩選
   // 地區篩選
if (regions) {
  const regionArray = regions.split(',');
  whereClauses.push(`si.site_city IN (?)`);
  parameters.push(regionArray);
}

// 標籤篩選
if (tags) {
  const tagArray = tags.split(',');
  tagArray.forEach(tagId => {
      // query += ' AND a.tag_id = ?';
      whereClauses.push('t.tag_id = ?') // 每個標籤條件
      parameters.push(tagId); // 將每個標籤 ID 加入參數中
  });
}


    // 如果有 WHERE 條件
    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    query += `
      GROUP BY 
      s.sch_id, s.sch_name, s.edit_date, si.photo_one, si.photo_two, si.site_add;
    `;

   
    // console.log("參數:", parameters);
    // console.log("WHERE 條件:", whereClauses);

    db.exec(query, parameters, (err, results) => {
      if (err) {
        console.log("-----標籤地區名取得異常-----");
        return reject(err);
      }
      resolve(results);
    });
  });
};




//取得景點資料
exports.findSite = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT SUBSTRING(site_add, 1, 6) AS short_site_add, sites.* FROM sites ORDER BY RAND() LIMIT 20";


    console.log("觀看這行" + db); // 在此行查看 db 的內容
    db.exec(query, [], (err, results) => {
      if (err) {
        return reject(err);
      }
      // 如果查詢結果有資料，返回第一筆
      //   resolve(results[0]);
      resolve(results);

    });
  });
};
// SELECT s.sch_id, s.sch_name, s.edit_date, s.end_date, DATEDIFF(s.end_date, s.edit_date) AS days, MAX(sd.sch_order) AS max_sch_order, sd.sch_day FROM schedule s LEFT JOIN schedule_details sd ON s.sch_id = sd.sch_id GROUP BY s.sch_id, s.sch_name, s.edit_date, s.end_date, sd.sch_day;

//取得行程資料
exports.getScheduleData = () => {
  return new Promise((resolve, reject) => {
    const query =
      `SELECT DISTINCT sch_id, sch_name, edit_date, end_date, 
       DATEDIFF(end_date, edit_date) AS days FROM schedule`;

    console.log("觀看這行" + db); // 在此行查看 db 的內容
    db.exec(query, [], (err, results) => {
      if (err) {
        return reject(err);
      }
      // 如果查詢結果有資料，返回第一筆
      //   resolve(results[0]);
      resolve(results);
    });
  });
};

//得到點擊card的資料
exports.getSiteData = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT DISTINCT site_id, site_name, site_add FROM sites";
    // SELECT DISTINCT  site_name, site_add ,site_info,photo_one FROM sites WHERE site_id = ?

    console.log("觀看這行" + db); // 在此行查看 db 的內容
    db.exec(query, [], (err, results) => {
      if (err) {
        return reject(err);
      }
      // 如果查詢結果有資料，返回第一筆
      //   resolve(results[0]);
      resolve(results);
    });
  });
};


//加入至行程資料庫
exports.addScheduleDetail = (sch_id, sch_day, sch_order, sch_spot) => {
  return new Promise((resolve, reject) => {
    // Step 1: 先將該行程和天數的所有景點順序 +1
    const updateQuery = "UPDATE schedule_details SET sch_order = sch_order + 1 WHERE sch_id = ? AND sch_day = ?";
    const updateValues = [sch_id, sch_day];

    console.log("插入的數據：", updateValues);
    db.exec(updateQuery, updateValues, (updateErr, updateResults) => {
      if (updateErr) {
        return reject(updateErr);
      }

      // Step 2: 在 Step 1 成功後，將新景點插入並將順序設置為 1
      const insertQuery =
        "INSERT INTO schedule_details (sch_id, sch_day, sch_order, sch_spot) VALUES (?, ?, ?, ?)";
      const insertValues = [sch_id, sch_day, 1, sch_spot]; // 注意這裡 sch_spot 是景點名稱

      // 調試：檢查插入的數據
      console.log("插入的數據：", insertValues);

      db.exec(insertQuery, insertValues, (insertErr, insertResults) => {
        if (insertErr) {
          return reject(insertErr);
        }

        // 成功後返回結果
        resolve(insertResults);
      });
    });
  });
};




//加入行程至我的最愛


exports.addScheduleId = (sch_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO member_like (sch_id) VALUES (?)'; // 修正 SQL 語句

    db.exec(sql, [sch_id], (err, result) => {
      if (err) {
        console.error('插入失敗:', err);
        reject(err); // 拒絕 Promise
      } else {
        resolve(result); // 成功時解析 Promise
      }
    });
  });
};


//影片連結
exports.findVideo = (yt) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT *, DATE_FORMAT(blog_date, '%Y-%m') AS blog_year_month FROM schedule_info ";


    console.log("觀看這行" + db); // 在此行查看 db 的內容
    db.exec(query, [yt], (err, results) => {
      if (err) {
        return reject(err);
      }
      // 如果查詢結果有資料，返回第一筆
      //   resolve(results[0]);
      resolve(results);
    });
  });
};
