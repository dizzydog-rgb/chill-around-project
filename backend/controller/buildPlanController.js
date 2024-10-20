const buildPlanModel = require("../models/buildPlanModel");

// 獲取所有旅行計畫資料的控制器
exports.getAllSchedule = async (req, res) => {
  try {
    // 從資料庫取得所有的行程資料
    const allschedule = await buildPlanModel.findAllSchedule();
    // 如果找不到資料，回傳 404
    if (!allschedule || allschedule.length === 0) {
      return res.status(404).json({ message: "schedule not found" });
    }
    // 成功取得資料後回傳 JSON 給前端
    res.json(allschedule);
  } catch (error) {
    // 錯誤處理
    console.error("Error fetching site:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 獲取特定旅行計畫資料的控制器
exports.getScheduleById = async (req, res) => {
  try {
    // 從 URL 參數中提取 ID
    const scheduleId = req.params.id;
    // 從資料庫取得所有的行程資料
    const schedule = await buildPlanModel.findScheduleById(scheduleId);
    // 如果找不到資料，回傳 404
    if (!schedule || schedule.length === 0) {
      return res.status(404).json({ message: "schedule not found" });
    }
    // 成功取得資料後回傳 JSON 給前端
    res.json(schedule);
  } catch (error) {
    // 錯誤處理
    console.error("Error fetching site:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
