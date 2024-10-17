const express = require("express");
const path = require("path");
const router = express.Router();

// 提供靜態檔案服務
// router.use(express.static(path.join(__dirname, "public"))); // 將 "public" 替換為您的靜態資源目錄

// GET 請求: 取得景點詳細資訊頁面
router.get("/siteinfo", function (req, res) {
    // res.send("成功呼叫")
  const options = {
    root: path.join(__dirname, "../../", "dist"),
  };
  const fileName = "siteinfo.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
}); 
module.exports = router;