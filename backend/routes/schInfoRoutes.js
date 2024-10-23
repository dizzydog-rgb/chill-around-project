const express = require("express");
const cors = require("cors"); 
const path = require("path");
const router = express.Router();
const schInfoController = require('../controller/schInfoController')


router.use(cors());
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

//取得景點資料
//http://localhost:8080/schInfo/siteinfo
router.get('/siteinfo', schInfoController.getSiteInfo);

//取得行程資料
//http://localhost:8080/schInfo/getsch
router.get('/getsch', schInfoController.getSch);

//同時取得行程及景點資料
//http://localhost:8080/schInfo/getspot
router.get('/getspot', schInfoController.getSchedulesAndSites);
//加入行程至選取日第一位
//http://localhost:8080/schInfo/getspot/add
router.post('/getspot/add', schInfoController.addSchedule);

//取得yt及部落格資料
//http://localhost:8080/schInfo/YtAndBlog
router.get('/YtAndBlog',schInfoController.getVideoUrl);




module.exports = router;
