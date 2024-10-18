const express = require("express");
const path = require("path");
const router = express.Router();
const cors = require('cors'); // 引入 CORS 套件
const siteController = require("../controller/siteController");


// 提供靜態檔案服務
// router.use(express.static(path.join(__dirname, "public"))); // 將 "public" 替換為您的靜態資源目錄

// 使用 CORS
router.use(cors());
// GET 請求: 取得景點詳細資訊頁面
router.get("/siteinfo/:id", siteController.getSiteById);


router.get("/searchSite", function (req, res) {
    // res.send("成功呼叫")
  const options = {
    root: path.join(__dirname, "../../", "dist"),
  };
  const fileName = "searchSite.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
}); 

router.get("/allsite", function (req, res) {
    // res.send("成功呼叫")
  const options = {
    root: path.join(__dirname, "../../", "dist"),
  };
  const fileName = "allSite.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
}); 

router.get("/foodmap", function (req, res) {
    // res.send("成功呼叫")
  const options = {
    root: path.join(__dirname, "../../", "dist"),
  };
  const fileName = "foodMap.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
}); 
module.exports = router;