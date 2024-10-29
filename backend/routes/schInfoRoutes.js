const express = require("express");
const cors = require("cors"); 
const path = require("path");
const router = express.Router();
const schInfoController = require('../controller/schInfoController')


router.use(cors());
// GET 請求:取得完整頁面
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

// GET 請求:取得所有景點資料
//http://localhost:8080/schInfo/siteinfo
router.get('/siteinfo', schInfoController.getSiteInfo);

// GET 請求:取得行程、標籤及內容景點資料
//http://localhost:8080/schInfo/getsch
router.get('/getsch', schInfoController.getSch);

// GET 請求: 獲取特定ID的行程資料
// http://localhost:8080/schInfo/schPlanned/id
router.get("/schPlanned/:id", schInfoController.getScheduleById);

// GET 請求:同時取得會員已編輯的行程及景點資料
//http://localhost:8080/schInfo/getspot
router.get('/getspot/:emailid', schInfoController.getSchedulesAndSites);

// POST 請求:加入行程至用戶選取當日的最前面
//http://localhost:8080/schInfo/getspot/add
router.post('/getspot/add', schInfoController.addSchedule);

// POST 請求:加入行程至用戶我的最愛
//http://localhost:8080/schInfo/getToLike
router.post('/getToLike', schInfoController.addSchToLike);
//DELETE 請求:刪除用戶我的最愛的行程
//http://localhost:8080/schInfo/removeLike
router.delete('/removeLike', schInfoController.removeSchFromLike);
//GET 請求:獲取用戶已加 Like 的行程
// http://localhost:8080//schInfo/getLikedItems
router.get('/getLikedItems/:emailid', schInfoController.getLikedItems);


// GET 請求:取得YTurl及部落格資料
//http://localhost:8080/schInfo/YtAndBlog
router.get('/YtAndBlog',schInfoController.getVideoUrl);




module.exports = router;
