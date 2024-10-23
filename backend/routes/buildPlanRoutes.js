const express = require("express");
const path = require("path");
const router = express.Router();
const buildPlanController = require("../controller/buildPlanController");

// 呼叫controller
// GET 請求: 獲取所有行程資料
router.get("/planList", buildPlanController.getAllSchedule);

// GET 請求: 獲取特定ID的行程資料
router.get("/editPlan/:id", buildPlanController.getScheduleById);

// GET 請求: 獲取所有的標籤
router.get("/editPlan/scheduleDetails/tags", buildPlanController.getAllTags);

// GET 請求: 獲取特定景點的標籤
router.get(
  "/editPlan/scheduleDetails/tags/:name",
  buildPlanController.getSiteTags
);

// PUT 請求: 修改特定ID行程
router.put("/editPlan/sites/:id", buildPlanController.putSiteDetailById);

// POST 請求: 新增特定ID行程的景點
// router.post("/editPlan/sites", buildPlanController.postSiteToSchedule);

module.exports = router;
