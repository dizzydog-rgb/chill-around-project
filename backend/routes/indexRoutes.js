const express = require("express");
const cors = require("cors"); 
const path = require("path");
const router = express.Router();
// var db = require('./db'); // 引入 db.js 檔案

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
        console.log('tell you:資料庫連線 正常');

    }
    
});

// 初始化 Express 應用
const app = express();

// 使用 CORS 中間件
app.use(cors({
    origin: 'http://localhost:5173', // 允許的來源
    methods: ['GET', 'POST'], // 允許的 HTTP 方法
    allowedHeaders: ['Content-Type'], // 允許的標頭
}));

// GET 請求: 取得頁面
router.get("/", function (req, res) {
  const options = {
    root: path.join(__dirname, "../../", "dist"),
  };

  const fileName = "index.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

router.get('/hero', function(req, res) {
  let sql = `SELECT * FROM schedule_info`;

  conn.query(sql, function(err, rows) {
    if (err) {
      console.log('tell you:資料庫連線 異常');
      console.log('-----------start---------------');
      console.log('tell you:' + err.sqlMessage);
      console.log('-----------end---------------');
      res.status(500).send('資料庫連線失敗');
    } else {
      console.log('tell you:資料庫連線 正常get 資料庫 schedule_info');
      res.json(rows); // 回傳資料到客戶端
    }
  });
});
// http://localhost:8080/hero

router.get('/herotag', function(req, res) {
  // 隨機選取 5 筆資料
  let sql = `SELECT * FROM all_tag ORDER BY RAND() LIMIT 5`;

  conn.query(sql, function(err, rows) {
    if (err) {
      console.log('tell you:資料庫連線 異常');
      console.log('-----------start---------------');
      console.log('tell you:' + err.sqlMessage);
      console.log('-----------end---------------');
      res.status(500).send('資料庫連線失敗');
    } else {
      console.log('tell you:資料庫連線 正常get 資料庫 all_tag');
      res.json(rows); // 回傳資料到客戶端
    }
  });
});
// http://localhost:8080/hero




app.use("/", router);
module.exports = router;
