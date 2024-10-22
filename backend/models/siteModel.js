const db = require("../config/siteDatabase");

// 獲取特定編號景點的模組函數
exports.findSiteById = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM sites WHERE site_id = ?"; // 根據 sites 資料表的 id 欄位
        console.log("觀看這行"+ db); // 在此行查看 db 的內容
    db.exec(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      // 如果查詢結果有資料，返回第一筆
      resolve(results[0]);
     
    });
  });
};

exports.findSiteByCity = (cityName) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM sites WHERE site_city = ?`; // 根據 sites 資料表的 id 欄位
        console.log("觀看這行"+ db); // 在此行查看 db 的內容
        db.exec(query, [cityName], (err, results) => {
            if (err) {
        console.log("-----城市名取得異常-----");
        return reject(err);
        
      }
      // 如果查詢結果有資料，返回第一筆
      resolve(results);
     
    });
  });
};
// 景點總覽隨機產生卡片
exports.findRandomSite = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT *
        FROM sites
        WHERE photo_one IS NOT NULL AND photo_one != ''
        ORDER BY RAND()
        LIMIT 9; `; // 根據 sites 資料表的 id 欄位
        console.log("觀看這行"+ db); // 在此行查看 db 的內容
        db.exec(query, [], (err, results) => {
            if (err) {
        console.log("-----隨機城市名取得異常-----");
        return reject(err);
        
      }
      // 如果查詢結果有資料，返回第一筆
      resolve(results);
     
    });
  });
};

// serchsite隨機產生卡片
exports.findRandomCard = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT *
        FROM sites
        WHERE photo_two IS NOT NULL AND photo_two != '' 
        ORDER BY RAND()
        LIMIT 4; `; // 隨機取四個資料 這些景點的photo_two必須有內容
        console.log("觀看這行"+ db); // 在此行查看 db 的內容
        db.exec(query, [], (err, results) => {
            if (err) {
        console.log("-----隨機卡片取得異常-----");
        return reject(err);
        
      }
      // 如果查詢結果有資料，返回第一筆
      resolve(results);
     
    });
  });
};

// 標籤卡片
exports.findSiteTag = (regions, tags) => {
    return new Promise((resolve, reject) => {
        let query = `
        SELECT s.*,
        GROUP_CONCAT(a.tag_name SEPARATOR ', ') AS tags  -- 聚合標籤
        FROM site_tag st
        JOIN sites s ON st.site_id = s.site_id
        JOIN all_tag a ON st.tag_id = a.tag_id
        `;
        const parameters = [];
        let whereClauses = []; // 儲存 WHERE 條件

        if (regions) {
            const regionArray = regions.split(','); // 解析地區
            whereClauses.push(`s.site_city IN (?)`); // 將條件推送到陣列
            parameters.push(regionArray); // 將地區參數加入參數中
            // query += `WHERE s.site_city IN (?)`;
            // query += ` AND s.site_city IN (?)`;
            // parameters.push(regionArray);
        }
        if (tags) {
            const tagArray = tags.split(',');
            tagArray.forEach(tagId => {
                // query += ' AND a.tag_id = ?';
                whereClauses.push('a.tag_id = ?') // 每個標籤條件
                parameters.push(tagId); // 將每個標籤 ID 加入參數中
            });
        }
        // 如果有任何 WHERE 條件，將其加入查詢
        if (whereClauses.length > 0) {
            query += ' WHERE ' + whereClauses.join(' AND '); // 關聯多個條件
        }

        query += ` GROUP BY s.site_id;`; // 集合結果
       

        db.exec(query, parameters, (err, results) => {
            if (err) {
                console.log("-----標籤地區名取得異常-----");
                return reject(err);
            }
            resolve(results);
        });
    });
};

exports.findSearchSite = (region,tag) =>{
    return new Promise((resolve, reject) =>{
        const query = `
        SELECT s.*,
        a.tag_id,a.tag_name 
        FROM site_tag st
        JOIN sites s ON st.site_id = s.site_id
        JOIN all_tag a ON st.tag_id = a.tag_id
        WHERE s.site_city IN (?)
        AND a.tag_id = ?
        `;
        if(region){
            query+=`WHERE s.site_city IN (?)`;
        }
        if(tag){
            query+=`AND a.tag_id =?`;
        }

        db.exec(query, [region, tag],(err, results) =>{
            if (err) {
                return reject(err);
              }
              // 如果查詢結果有資料，返回第一筆
              resolve(results[0]);
        });
    });
}


