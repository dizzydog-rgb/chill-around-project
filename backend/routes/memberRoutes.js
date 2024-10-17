const express = require("express");
const path = require("path");
const router = express.Router();

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

module.exports = router;
