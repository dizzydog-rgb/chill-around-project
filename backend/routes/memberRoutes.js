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

// GET請求: 獲取當前會員行程資料
router.get("/planList", memberController.getuserSchedule);

module.exports = router;
