const express = require("express");
const router = express.Router();

const cors = require("cors");
router.use(cors());

// 路徑檢視
// console.log("Current directory:", __dirname);
// console.log("Trying to require PopupBudgetController from:", "../controllers/PopupBudgetController");

const PopupBudgetController = require("../controller/PopupBudgetController");

// 定義 GET 請求的路由為 /sites/:id，來處理帶有景點 ID 的請求
router.get("/popupbudget/:id", PopupBudgetController.getPopupBudgetById);
module.exports = router;
