const express = require("express");
const path = require("path");
const router = express.Router();
const bodyParser = require('body-parser');
const memberController = require("../controller/memberController");
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadphoto');

router.use(bodyParser.json());
router.use('/images', express.static(__dirname + '/assets/images'));

// POST 傳送登入帳密
router.post("/login", memberController.login);

// POST 傳送註冊資料
router.post("/register", memberController.registermember);

// 驗證帳密，GET請求: 取得資料庫會員資料
router.get("/members", auth, memberController.getByemail);

// POST 傳送更新的會員資料
router.post("/update", auth, upload.single('uphoto'), memberController.updatemember);

// POST 傳送 Google登入資料
router.post("/Googlelogin", memberController.Googlelogin);

// POST 傳送 Google註冊資料
router.post("/Googleregister", memberController.Googleregister);

// POST Google更新綁定資料
router.post("/GoogleBind", auth, memberController.GoogleBind);

// POST Google解除綁定
router.post("/delGoogleid", auth, memberController.delGoogleid);

// POST 傳送 Line登入資料
router.post("/Linelogin", memberController.Linelogin);

// POST 傳送Line註冊資料
router.post("/Lineregister", memberController.Lineregister);

// POST Line更新綁定資料
router.post("/LineBind", auth, memberController.LineBind);

// POST Line解除綁定
router.post("/delLineid", auth, memberController.delLineid);

// GET請求: 獲取會員行程資料
router.get("/planList/:page([0-9]+)", auth, memberController.getuserSchedule);

// DELETE 請求: 刪除多筆行程資料
router.delete("/delPlanList/:ids", memberController.deluserSchByIds);

// GET請求: 獲取會員收藏的行程資料
router.get("/myLikeSch/:page([0-9]+)", auth, memberController.getLikeSch);

// DELETE 請求: 刪除多筆收藏的行程資料
router.delete("/delmyLikeSch/:ids", memberController.delmyLikeSchByIds);

module.exports = router;
