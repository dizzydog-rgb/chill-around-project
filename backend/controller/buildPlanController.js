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

// 獲取用於景點的modal的所有標籤的控制器
exports.getAllTags = async (req, res) => {
  try {
    // 從資料庫取得所有的標籤資料
    const alltags = await buildPlanModel.findAllTag();
    // 如果找不到資料，回傳 404
    if (!alltags || alltags.length === 0) {
      return res.status(404).json({ message: "alltags not found" });
    }
    // 成功取得資料後回傳 JSON 給前端
    res.json(alltags);
  } catch (error) {
    // 錯誤處理
    console.error("controller發生錯誤:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 獲取用於景點的modal的標籤的控制器
exports.getSiteTags = async (req, res) => {
  try {
    // 從 URL 參數中提取 景點名稱
    const siteName = decodeURIComponent(req.params.name);
    // console.log("Received siteName:", siteName);
    // 從資料庫取得特定景點的標籤資料
    const tags = await buildPlanModel.findTagBySiteName(siteName);
    // 如果找不到資料，回傳 404
    if (!tags || tags.length === 0) {
      return res.status(404).json({ message: "tag not found" });
    }
    // 成功取得資料後回傳 JSON 給前端
    res.json(tags);
  } catch (error) {
    // 錯誤處理
    console.error("controller發生錯誤:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 編輯特定景點的控制器
exports.putSiteDetailById = async (req, res) => {
  try {
    // 從 URL 參數中提取 ID、景點名稱、及景點說明
    const detail_id = req.params.id;
    const { sch_spot, sch_paragh, tags } = req.body;

    // 調用 model 中的方法更新 景點資料
    await buildPlanModel.updateSiteDetailById(detail_id, sch_spot, sch_paragh);

    // 調用 model 中的方法更新 標籤關聯
    await buildPlanModel.updateSiteTags(sch_spot, tags);

    // 成功取得資料後回傳 更新成功 的訊息給前端
    res.send({ message: "更新成功" });
  } catch (error) {
    // 錯誤處理
    console.error("Error updating schedule detail:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
