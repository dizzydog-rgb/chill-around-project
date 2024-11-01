const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());

// 呼叫控制器 
const itemController = require("../controller/itemController");

// 這裡定義各種資料取用的路由請求
router.get("/popupItem", itemController.getItemCategory); // 渲染物品種類框

// 之後新增.post、刪除.delete功能也要接這個路由
router.get("/Useritem/:id", itemController.getUseritemListId); // 獲取特定使用者物品資料
router.post("/Useritem/:id", itemController.userAdditemController); // 使用者新增 - 物品種類

router.put("/Useritem/:id", itemController.updateUseritemDetailsController); // 使用者編輯 - 物品細項
router.post("/Useritem/:id/details", itemController.userAdditemDetailsController); // 使用者新增 - 物品細項
router.delete('/Useritem/:id/:itemListId', itemController.deleteUserItemDetailsController); // 使用者刪除 - 物品細項

router.delete('/Useritem/:id/category/:Icategory_id', itemController.deleteUserItemAllCategoryController);

module.exports = router;
