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
http://localhost:8080/schInfo/siteinfo
router.get('/siteinfo', schInfoController.getSiteInfo);
router.get('/getspot', schInfoController.getSchedulesAndSites);
router.post('/getspot/add', schInfoController.addSchedule);

//http://localhost:8080/schInfo/YtAndBlog
router.get('/YtAndBlog',schInfoController.getVideoUrl);




module.exports = router;
