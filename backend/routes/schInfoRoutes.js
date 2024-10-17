const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();


// 提供 HTML 頁面
// app.get('/schInfo', function (req, res) {
//     res.sendFile(__dirname + '/dist/schInfo.html');
//   });

// // GET 請求: 取得頁面
router.get("/Info", function (req, res) {
  const options = {
    root: path.join(__dirname, "../../", "dist"),
  };

  const fileName = "/schInfo.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});




module.exports = router;
