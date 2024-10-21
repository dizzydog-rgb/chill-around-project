const express = require("express");
const path = require("path");
const router = express.Router();

// 假設這是一些計畫的假資料
// const plans = [
//     { id: 1, planName: 'First Plan', startDate: '2024/8/10', endDate: '2024/8/12' },
//     { id: 2, planName: 'second Plan', startDate: '2024/10/15', endDate: '2024/10/18' },
//     { id: 3, planName: 'Third Plan', startDate: '2024/11/25', endDate: '2024/11/27' }
//   ];

// GET 請求: 取得頁面
router.get("/create", function (req, res) {
  const options = {
    root: path.join(__dirname, "../../", "dist"),
  };

  const fileName = "buildPlan.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

router.get("/edit", function (req, res) {
  const options = {
    root: path.join(__dirname, "../../", "dist"),
  };

  const fileName = "editPlan.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

router.get("/list", function (req, res) {
  const options = {
    root: path.join(__dirname, "../../", "dist"),
  };

  const fileName = "planList.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

module.exports = router;
