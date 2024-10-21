const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const schInfoContronller = require('../controller/schInfoContronller')

//取得頁面
//http://localhost:8080/schInfo/Info
router.get("/Info", function (req, res) {
  const options = {
    root: path.join(__dirname, "../../", "dist"),
  };

  const fileName = "schInfo.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

router.get('/Youtube',schInfoContronller.getVideoUrl);



module.exports = router;
