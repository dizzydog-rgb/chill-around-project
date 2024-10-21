const express = require("express");
const path = require("path");
const router = express.Router();
const buildPlanController = require("../controller/buildPlanController");

// GET 請求: 呼叫controller
router.get("/planList", buildPlanController.getAllSchedule);
router.get("/editPlan/:id", buildPlanController.getScheduleById);

module.exports = router;
