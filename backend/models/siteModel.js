const db = require("../config/database");

// 獲得全部景點資料
exports.findAllSite = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM sites;" ; // 找到site資料表所有資料
        console.log("觀看這行"+ db); // 在此行查看 db 的內容
    db.exec(query, [], (err, results) => {
      if (err) {
        return reject(err);
      }
      // 如果查詢結果有資料，返回全部
      resolve(results);
     
    });
  });
};
// 獲得全部美食店家資料
exports.findAllFood = () => {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT * ,
        SUBSTRING(store_city,6, 6) AS short_city
        FROM foodmap
        WHERE photo_two IS NOT NULL AND photo_two != ''
        ORDER BY RAND()
        LIMIT 4;
        `; // 找到site資料表所有資料
        console.log("觀看這行"+ db); // 在此行查看 db 的內容
    db.exec(query, [], (err, results) => {
      if (err) {
        return reject(err);
      }
      // 如果查詢結果有資料，返回全部
      resolve(results);
     
    });
  });
};
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
            SELECT 
                s.site_id,
                s.site_name,
                LEFT(s.site_add,6) AS short_add,
                s.photo_one,
                s.photo_two,
                s.photo_three
        FROM sites s
        WHERE photo_three IS NOT NULL AND photo_three != ''
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
            SELECT 
                s.site_id,
                s.site_name,
                LEFT(s.site_add,6) AS short_add,
                s.photo_one,
                s.photo_two,
                s.photo_three
        FROM sites s
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

// 根據使用者選地區類別對應到的資料庫內容

exports.findSiteTag = (regions, tags) => {
    return new Promise((resolve, reject) => {
        let query = `
        SELECT 
            s.site_id,
            s.site_name,
            s.site_city,
            LEFT(s.site_add, 6) AS short_add,
            s.photo_one,
            s.photo_two,
            GROUP_CONCAT(a.tag_name SEPARATOR ', ') AS tags
        FROM 
            site_tag st
        JOIN 
            sites s ON st.site_id = s.site_id
        JOIN 
            all_tag a ON st.tag_id = a.tag_id
        `;
        
        const parameters = [];
        let whereClauses = []; // 儲存 WHERE 條件

        if (regions) {
            const regionArray = regions.split(',');
            whereClauses.push(`s.site_city IN (?)`); // 放使用者選的地區
            parameters.push(regionArray);
        }

        if (tags) {
            const tagArray = tags.split(',');
            const tagConditions = tagArray.map(() => 'st.tag_id = ?').join(' OR '); // 動態生成ＯＲ條件 為了讓使用者選擇多個標籤，顯示有那些標籤的地點
            whereClauses.push(`(${tagConditions})`);
            parameters.push(...tagArray); // 把標籤id加入陣列
        }
        // 組合 WHERE 子句
        if (whereClauses.length > 0) {
            query += ' WHERE ' + whereClauses.join(' AND '); // 主要句子連接條件
        }

        query += ` GROUP BY s.site_id;`; // 按照 site_id 分組
        

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

exports.addFoodSiteData = (place) => {
    const { id, name, formatted_address, formatted_phone_number, photos, vicinity, opening_hours_text, types } = place;    
    return new Promise((resolve, reject) => {
        // 準備照片 URL，添加判斷獲取 URL
        const photoUrls = photos.map((url, index) => url || null); // 用頂多5個 URL

        const query = `
        INSERT INTO foodmap (store_id, store_name, store_city, store_add, store_tel, store_opentime, photo_one, photo_two, photo_three, photo_four, photo_five, store_types)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);
        `;
        
        const values = [
            id,
            name,
            formatted_address,
            vicinity, // 此處為市區
            formatted_phone_number,
            opening_hours_text,
            photoUrls[0] || null, // 如果沒有 URL，則設置為 null
            photoUrls[1] || null,
            photoUrls[2] || null,
            photoUrls[3] || null,
            photoUrls[4] || null,
            types.join(','), // 將類別轉換為字符串
        ];

        db.exec(query, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}
// 加入行程按鈕 找行程資料
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

  // 得到點擊card的資料
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
  


