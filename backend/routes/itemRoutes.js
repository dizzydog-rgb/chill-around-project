const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());

// 呼叫控制器 
const itemController = require("../controller/itemController");

// 這裡定義各種資料取用的路由請求
router.get("/popupItem", itemController.getItemCategory); // 渲染物品種類框

// 之後新增.post、刪除.delete功能也要接這個路由
router.get("/Useritem/:id", itemController.getUseritemListId); // 特定使用者預算資料
router.post("/Useritem/:id", itemController.userAdditemController); // 新增使用者預算資料

// router.get("/UserBudget/:id/:detailId", itemController.getUserBudgetOneDetails); // 渲染使用者選取的預算資料方塊
// router.put("/UserBudget/:id/:detailId", itemController.userEditBudgetController); // 編輯使用者選取的預算資料方塊
// router.delete("/UserBudget/:id/:detailId", itemController.userDeleteBudgetController); // 特定使用者預算資料

module.exports = router;
