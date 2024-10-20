const express = require("express");
const router = express.Router();

const cors = require("cors");
router.use(cors());

// 路徑檢視
// console.log("Current directory:", __dirname);
// console.log("Trying to require PopupBudgetController from:", "../controllers/PopupBudgetController");

// 呼叫控制器
const popupBudgetController = require("../controller/popupBudgetController");


// 定義 GET 請求的路由為 /sites/:id，來處理帶有景點 ID 的請求
// 這裡定義各種資料取用的路由請求
router.get("/popupBudget/:id", popupBudgetController.getPopupBudgetById);
router.get("/popupBudgets", popupBudgetController.getAllPopupBudgets);


module.exports = router;
