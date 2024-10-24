const express = require("express");
const path = require("path");
const router = express.Router();
const bodyParser = require('body-parser');
const memberController = require("../controller/memberController");
const auth = require('../middleware/authMiddleware');
var db = require('../config/database');

router.use(bodyParser.json());
router.use('/images', express.static(__dirname + '/assets/images'));

// GET 請求: 取得頁面
// 登入
router.get("/login", function (req, res) {
    const options = {
        root: path.join(__dirname, "../../", "dist"),
    };

    const fileName = "login.html";
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error("Error sending file:", err);
        } else {
            console.log("Sent:", fileName);
        }
    });
});

// POST 傳送登入帳密
router.post("/login", memberController.login);

// 註冊頁面
router.get("/register", function (req, res) {
    const options = {
        root: path.join(__dirname, "../../", "dist"),
    };

    const fileName = "register.html";
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error("Error sending file:", err);
        } else {
            console.log("Sent:", fileName);
        }
    });
});

// 傳送註冊資料
router.post("/register", memberController.registermember);

// 驗證帳密，取得資料庫會員資料
router.get("/members/user", auth, memberController.getByemail);

// 個人資訊頁面
router.get("/personaldata", function (req, res) {
    const options = {
        root: path.join(__dirname, "../../", "dist"),
    };

    const fileName = "member_personaldata.html";
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error("Error sending file:", err);
        } else {
            console.log("Sent:", fileName);
        }
    });
});

// 我的行程頁面
router.get("/mytrip", function (req, res) {
    const options = {
        root: path.join(__dirname, "../../", "dist"),
    };

    const fileName = "member_mytrip.html";
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error("Error sending file:", err);
        } else {
            console.log("Sent:", fileName);
        }
    });
});

// 我的收藏行程頁面
router.get("/mycollection", function (req, res) {
    const options = {
        root: path.join(__dirname, "../../", "dist"),
    };

    const fileName = "member_mycollection.html";
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error("Error sending file:", err);
        } else {
            console.log("Sent:", fileName);
        }
    });
});

// 台灣制縣地圖
router.get("/TaiwanEx", function (req, res) {
    const options = {
        root: path.join(__dirname, "../../", "dist"),
    };

    const fileName = "TaiwanEx.html";
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error("Error sending file:", err);
        } else {
            console.log("Sent:", fileName);
        }
    });
});

module.exports = router;
