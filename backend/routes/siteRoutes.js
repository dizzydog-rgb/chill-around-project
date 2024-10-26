const express = require("express");
const path = require("path");
const router = express.Router();
const cors = require('cors'); // 
const siteController = require("../controller/siteController");


// 提供靜態檔案服務
// router.use(express.static(path.join(__dirname, "public"))); // 將 "public" 替換為您的靜態資源目錄

// 使用 CORS
router.use(cors());

// GET 請求: 取得所有景點資料
// http://localhost:8080/site/allsite
router.get("/allsite", siteController.getAllSite);
// GET 請求: 取得所有食物店家資料
// http://localhost:8080/site/allfood
router.get("/allfood", siteController.getAllFood);

// GET 請求: 取得景點詳細資訊頁面
router.get("/siteinfo/:id", siteController.getSiteById);

// GET 請求: 取得景點總覽頁面資料
// router.get("/allsite/:city", siteController.getSiteByCity);
router.get("/allsite/select", siteController.getSiteTag);
// GET 請求: 8080取得景點隨機資料
router.get("/allsite/all/randomCity", siteController.getRandomSite);


// GET 請求: 8080取得熱門景點4筆資料
router.get("/searchSite/randomSite", siteController.getRandomCard ); 

// GET 請求:同時取得會員已編輯的行程及景點資料
//http://localhost:8080/schInfo/getspot
router.get('/getspot', siteController.getSchedulesAndSites);
// POST 請求:加入行程至用戶選取當日的最前面
//http://localhost:8080/schInfo/getspot/add
router.post('/getspot/add', siteController.addSchedule);

router.get('/searchsite/search?', siteController.getsearchSite);

router.post('/foodmap/add', siteController.addFoodSite);

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