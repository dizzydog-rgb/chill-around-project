// let mysql =require('mysql');
// let conn = mysql.createConnection({
//     host:'127.0.0.1',
//     user:'root',
//     password:'',
//     database:'chill_around'
// })

// conn.connect(function (err) {

//     if(err){
//         console.log('tell you:資料庫連線 異常');
//         console.log('-----------start---------------');
//         console.log(err.sqlMessage);
//         console.log('-----------end---------------');

//     }else{
//         console.log('tell you:資料庫連線 sch正常');

//     }

// });

const db = require("../config/database");

exports.findSite = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT SUBSTRING(site_add, 1, 6) AS short_site_add, sites.* FROM sites ORDER BY RAND() LIMIT 20";


      console.log("觀看這行"+ db); // 在此行查看 db 的內容
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

exports.addScheduleDetail = (sch_id, sch_day,sch_order,sch_spot) => {
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
      const insertValues = [sch_id, sch_day,1, sch_spot]; // 注意這裡 sch_spot 是景點名稱

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
