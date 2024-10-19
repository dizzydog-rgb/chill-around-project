const express = require("express");
const path = require("path");
const router = express.Router();
const bodyParser = require('body-parser');
var db = require('../config/database');

router.use(bodyParser.json());
router.use('/images', express.static(__dirname + '/assets/images'));

// GET 請求: 取得頁面
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

// 取得資料庫資料
router.get('/members', function (req, res) {
    db.exec('SELECT * FROM `member`',[],function (data,fields) {
        res.json(data);
    })
});

module.exports = router;
