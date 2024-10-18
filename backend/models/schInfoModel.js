let mysql =require('mysql');
let conn = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'chill_around'
})


conn.connect(function (err) {

    if(err){
        console.log('tell you:資料庫連線 異常');
        console.log('-----------start---------------');
        console.log(err.sqlMessage);
        console.log('-----------end---------------');
        
    }else{
        console.log('tell you:資料庫連線 sch正常');

    }
    
});


// hero img sql
exports.findVideo = (yt) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM schedule_info"; 

        console.log("觀看這行"+ conn); // 在此行查看 db 的內容
        conn.query(query, [yt], (err, results) => {
      if (err) {
        return reject(err);
      }
      // 如果查詢結果有資料，返回第一筆
    //   resolve(results[0]);
      resolve(results);
     
    });
  });
};