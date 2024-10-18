const express = require("express");
// const cors = require("cors"); 
const path = require("path");
const router = express.Router();
const indexContronller = require("../controller/indexController")
// var db = require('../config/database');// db.js 檔案

// 取得頁面
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

router.get('/heroCarousel',indexContronller.getHeroImg);
router.get('/herotag',indexContronller.getHeroTag);

// router.get('/herotag', function(req, res) {
//   // 隨機選取 5 筆資料
//   let sql = `SELECT * FROM all_tag ORDER BY RAND() LIMIT 5`;

//   conn.query(sql, function(err, rows) {
//     if (err) {
//       console.log('tell you:資料庫連線 異常');
//       console.log('-----------start---------------');
//       console.log('tell you:' + err.sqlMessage);
//       console.log('-----------end---------------');
//       res.status(500).send('資料庫連線失敗');
//     } else {
//       console.log('tell you:資料庫連線 正常get 資料庫 all_tag');
//       res.json(rows); // 回傳資料到客戶端
//     }
//   });
// });

module.exports = router;
