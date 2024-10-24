const express = require("express");
const cors = require("cors"); 
const path = require("path");
const router = express.Router();
const indexContronller = require("../controller/indexController")
// var db = require('../config/database');// db.js 檔案

router.use(cors());

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

// 取得輪播圖
router.get('/heroCarousel',indexContronller.getHeroImg);
// 取得tag
router.get('/herotag',indexContronller.getHeroTag);


module.exports = router;
