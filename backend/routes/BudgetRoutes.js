const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());

// 路徑檢視
// console.log("Current directory:", __dirname);
// console.log("Trying to require PopupBudgetController from:", "../controllers/PopupBudgetController");

// 呼叫控制器 
const BudgetController = require("../controller/budgetController");

// 定義 GET 請求的路由為 /sites/:id，來處理帶有景點 ID 的請求
// 這裡定義各種資料取用的路由請求
router.get("/popupBudget", BudgetController.getBudgetCategory); // 渲染預算種類框

// 之後新增.post、刪除.delete功能也要接這個路由
router.get("/UserBudget/:id", BudgetController.getUserBudgetID); // 特定使用者預算資料
router.post("/UserBudget/:id", BudgetController.userAddBudgetController); // 新增使用者預算資料

router.get("/UserBudget/:id/:detailId", BudgetController.getUserBudgetOneDetails); // 渲染使用者選取的預算資料方塊
router.put("/UserBudget/:id/:detailId", BudgetController.userEditBudgetController); // 編輯使用者選取的預算資料方塊
router.delete("/UserBudget/:id/:detailId", BudgetController.userDeleteBudgetController); // 特定使用者預算資料

module.exports = router;
