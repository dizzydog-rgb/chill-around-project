const express = require("express");
const path = require("path");
const router = express.Router();

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

module.exports = router;
