const testModel = require("../models/testModel");

exports.getTestById = async (req, res) => {
    try {
      // 從 URL 參數中提取 ID
      const testId = req.params.id;
      // 從資料庫取得特定 ID 的景點資料
      const style = await testModel.findTestById(testId);
      // 如果找不到資料，回傳 404
      if (!style) {
        return res.status(404).json({ message: "Style not found" });
      }
      // 成功取得資料後回傳 JSON 給前端
      res.json(style);
    } catch (error) {
      // 錯誤處理
      console.error("Error fetching site:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };