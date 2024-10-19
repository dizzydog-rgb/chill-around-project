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
        const query = "SELECT * FROM sites WHERE site_city = ?"; // 根據 sites 資料表的 id 欄位
        console.log("觀看這行"+ db); // 在此行查看 db 的內容
        db.exec(query, [cityName], (err, results) => {
            if (err) {
        console.log("-----城市名取得異常-----");
        return reject(err);
        
      }
      // 如果查詢結果有資料，返回第一筆
      resolve(results[0]);
     
    });
  });
};