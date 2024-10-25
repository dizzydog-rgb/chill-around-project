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
            LEFT(s.site_add,6) AS short_add,
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

        query += `GROUP BY  s.site_id, s.site_name, s.site_city, s.site_add, s.photo_one, s.photo_two;`; // 集合結果
       

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

// exports.addFoodSiteData = (place) => {
//     const {id,name,formatted_address,formatted_phone_number,photos,vicinity,types,opening_hours_text}=place;    
//     return new Promise((resolve, reject) => {
//         const query = `
//         INSERT INTO foodmap (site_id, store_name, store_city, store_add, store_tel, store_opentime, photo_one,photo_two,photo_three,photo_four,photo_five)
//         VALUES (?,?,?,?,?,?,?,?,?,?,?);
//         `;
//         const values = [
//             place.id,
//             place.name,
//             place.formatted_address,
//             place.vicinity,
//             place.formatted_phone_number,
//             place.opening_hours_text,
//             place.photo[0]?.getUrl(),
//             place.photo[1]?.getUrl(),
//             place.photo[2]?.getUrl(),
//             place.photo[3]?.getUrl(),
//             place.photo[4]?.getUrl(),
//             place.types.join(','), // 將類別轉換為字符串
//           ];
//         db.exec(query, values, (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(results);
//         });
//     });
// }


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



