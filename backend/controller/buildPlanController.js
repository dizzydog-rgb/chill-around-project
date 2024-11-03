const buildPlanModel = require("../models/buildPlanModel");

// 新增計畫的控制器
exports.postNewSchedule = async (req, res) => {
  try {
    // 從 req.body 中提取 計畫名稱、開始日期、及結束日期、email ID
    const { sch_name, start_date, end_date, email_id } = req.body;

    // 調用 model 中的方法新增 旅行計畫
    const result = await buildPlanModel.addSchedule(
      sch_name,
      start_date,
      end_date,
      email_id
    );

    // 成功取得資料後回傳 更新成功 的訊息給前端
    res.send({
      message: "新增計畫成功",
      data: result,
    });
  } catch (error) {
    // 錯誤處理
    console.error("Error adding schedule:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 獲取會員的所有旅行計畫資料的控制器
exports.getAllSchedule = async (req, res) => {
  try {
    const emailId = req.params.id;
    // 從資料庫取得所有的行程資料
    const allschedule = await buildPlanModel.findAllSchedule(emailId);
    // 如果找不到資料，回傳 404
    if (!allschedule || allschedule.length === 0) {
      return res.status(404).json({ message: "schedule not found" });
    }
    // 成功取得資料後回傳 JSON 給前端
    res.json(allschedule);
  } catch (error) {
    // 錯誤處理
    console.error("Error fetching schedule list:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 刪除特定旅行計畫資料的控制器
exports.deleteScheduleById = async (req, res) => {
  try {
    // 從 URL 參數中提取 ID
    const scheduleId = req.params.id;
    // 從資料庫刪除特定ID的行程資料
    const result = await buildPlanModel.dropScheduleById(scheduleId);
    // 如果找不到資料，回傳 404

    // 成功刪除後回傳 JSON 給前端
    res.json(result);
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
    console.log(sch_spot, sch_paragh, tags);

    // 調用 model 中的方法更新 景點資料
    await buildPlanModel.updateSiteDetailById(detail_id, sch_spot, sch_paragh);

    // 確認 sites 資料表中，有沒有此景點
    const siteExists = await buildPlanModel.checkSiteExists(sch_spot);

    // 調用 model 中的方法更新 標籤關聯
    if (siteExists) {
      // 如果景點名稱存在，更新標籤關聯
      await buildPlanModel.updateSiteTags(sch_spot, tags);
    } else {
      // 如果景點名稱不存在，跳過標籤更新
      console.log(`景點名稱 ${sch_spot} 不存在，跳過標籤更新`);
    }

    // 成功取得資料後回傳 更新成功 的訊息給前端
    res.send({ message: "更新成功" });
  } catch (error) {
    // 錯誤處理
    console.error("Error updating schedule detail:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 新增景點的控制器
exports.postSiteToSchedule = async (req, res) => {
  try {
    // 從 URL 參數中提取 ID、第幾天、景點名稱、及景點說明
    const sch_id = req.params.id;
    const sch_day = req.params.day;
    const { sch_spot, sch_paragh } = req.body;
    // console.log("控制器", sch_id, sch_day, sch_spot, sch_paragh );

    // 調用 model 中的方法新增 景點資料
    await buildPlanModel.addSiteToSchedule(
      sch_id,
      sch_day,
      sch_spot,
      sch_paragh
    );

    // 成功取得資料後回傳 更新成功 的訊息給前端
    res.send({ message: "更新成功" });
  } catch (error) {
    // 錯誤處理
    console.error("Error updating schedule detail:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 編輯特定天數的景點順序的控制器
exports.putSiteOrder = async (req, res) => {
  try {
    // 從 URL 參數中提取 行程ID、第幾天、及景點順序
    const sch_id = req.params.id;
    const sch_day = req.params.day;
    const { sch_order_array } = req.body;

    // 調用 model 中的方法更新 景點資料
    await buildPlanModel.updateSiteOrder(sch_id, sch_day, sch_order_array);

    // 成功取得資料後回傳 更新成功 的訊息給前端
    res.send({ message: "景點順序更新成功" });
  } catch (error) {
    // 錯誤處理
    console.error("Error updating site order:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 刪除特定景點的控制器
exports.deleteSiteDetailById = async (req, res) => {
  try {
    // 從 URL 參數中提取 ID、景點名稱、及景點說明
    const detail_id = req.params.id;

    // 調用 model 中的方法更新 景點資料
    await buildPlanModel.dropSiteDetailById(detail_id);

    // 成功刪除資料後回傳 更新成功 的訊息給前端
    res.send({ message: "刪除成功" });
  } catch (error) {
    // 錯誤處理
    console.error("Error deleting schedule detail:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 新增新的一天的控制器
exports.postNewDayToSchedule = async (req, res) => {
  try {
    // 從 URL 參數中提取 ID、景點名稱、及景點說明
    const { sch_id, sch_day } = req.body;

    // 調用 model 中的方法新增 旅行計畫
    const result = await buildPlanModel.addNewDay(sch_id, sch_day);

    // 成功取得資料後回傳 更新成功 的訊息給前端
    res.send({
      message: "新增新的一天成功",
      data: result,
    });
  } catch (error) {
    // 錯誤處理
    console.error("Error adding new day:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 獲取特定旅行計畫資料的控制器
exports.getBudget = async (req, res) => {
  try {
    // 從 URL 參數中提取 ID
    const scheduleId = req.params.id;
    // 從資料庫取得所有的行程資料
    const budget = await buildPlanModel.findBudgetyId(scheduleId);
    // 如果找不到資料，回傳 404
    if (!budget || budget.length === 0) {
      return res.status(404).json({ message: "budget not found" });
    }
    // 成功取得資料後回傳 JSON 給前端
    // console.log("成功取得資料");
    res.json(budget);
  } catch (error) {
    // 錯誤處理
    console.error("Error fetching budget:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
