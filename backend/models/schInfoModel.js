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

exports.getScheduleData = () => {
  return new Promise((resolve, reject) => {
      const query = "SELECT DISTINCT sch_id, sch_name, edit_date, end_date, DATEDIFF(end_date, edit_date) AS days FROM schedule"; 

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

exports.getSiteData = () => {
  return new Promise((resolve, reject) => {
      const query = "SELECT DISTINCT site, site_name, site_add FROM test_site"; 

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

exports.addScheduleDetail = (sch_id, sch_day, sch_order, sch_spot) => {
  return new Promise((resolve, reject) => {
      const query = "INSERT INTO schedule_details (sch_id, sch_day, sch_order, sch_spot) VALUES (?, ?, ?, ?)"; 
      const values = [sch_id, sch_day, sch_order, sch_spot];
      console.log("觀看這行"+ db); // 在此行查看 db 的內容
      db.exec(query, values, (err, results) => {
    if (err) {
      return reject(err);
    }
    // 如果查詢結果有資料，返回第一筆
  //   resolve(results[0]);
    resolve(results);
   
  });
});
};






exports.findVideo = (yt) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM schedule_info"; 

        console.log("觀看這行"+ db); // 在此行查看 db 的內容
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