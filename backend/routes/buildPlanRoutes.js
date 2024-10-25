const express = require("express");
const path = require("path");
const router = express.Router();
const buildPlanController = require("../controller/buildPlanController");

// 呼叫controller
// POST 請求: 新增特定ID行程的景點
router.post("/buildPlan", buildPlanController.postNewSchedule);

// GET 請求: 獲取所有行程資料
router.get("/planList", buildPlanController.getAllSchedule);

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

// DELETE 請求: 刪除特定ID景點
router.delete("/editPlan/sites/:id", buildPlanController.deleteSiteDetailById);

module.exports = router;
