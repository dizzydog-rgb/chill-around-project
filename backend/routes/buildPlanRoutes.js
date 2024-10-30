const express = require("express");
const path = require("path");
const router = express.Router();
const buildPlanController = require("../controller/buildPlanController");

// 呼叫controller
// POST 請求: 新增特定ID行程的景點
router.post("/buildPlan", buildPlanController.postNewSchedule);

// GET 請求: 獲取會員的所有行程資料
router.get("/planList/:id", buildPlanController.getAllSchedule);

// DELETE 請求:  刪除特定ID的行程資料
router.delete("/planList/:id", buildPlanController.deleteScheduleById);

// GET 請求: 獲取特定ID的行程資料
router.get("/editPlan/:id", buildPlanController.getScheduleById);

// GET 請求: 獲取所有的標籤
router.get("/editPlan/scheduleDetails/tags", buildPlanController.getAllTags);

// GET 請求: 獲取特定景點的標籤
router.get(
  "/editPlan/scheduleDetails/tags/:name",
  buildPlanController.getSiteTags
);

// PUT 請求: 修改特定ID景點
router.put("/editPlan/sites/:id", buildPlanController.putSiteDetailById);

// POST 請求: 新增特定ID行程的景點
router.post("/editPlan/sites/:id/:day", buildPlanController.postSiteToSchedule);

// PUT 請求: 變更特定ID行程的天數的景點順序
router.put("/editPlan/sites/order/:id/:day", buildPlanController.putSiteOrder);

// DELETE 請求: 刪除特定ID景點
router.delete("/editPlan/sites/:id", buildPlanController.deleteSiteDetailById);

// POST 請求: 新增新的一天
router.post("/editPlan/addDay", buildPlanController.postNewDayToSchedule);

// GET 請求: 取得特定ID行程的預算
router.get("/editPlan/budget/:id", buildPlanController.getBudget);

module.exports = router;
