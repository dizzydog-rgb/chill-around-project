const siteModel = require("../models/siteModel");
exports.getSiteById = async (req, res) => {
    try {
      // 從 URL 參數中提取 ID
      const siteId = req.params.id;
      // 從資料庫取得特定 ID 的景點資料
      const mySite = await siteModel.findSiteById(siteId);
      // 如果找不到資料，回傳 404
      if (!mySite) {
        return res.status(404).json({ message: "Site not found" });
      }
      // 成功取得資料後回傳 JSON 給前端
      res.json(mySite);
    } catch (error) {
      // 錯誤處理
      console.error("Error fetching site:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };

// 用地區名稱撈資料
exports.getSiteByCity = async (req, res) => {
    try {
      // 從 URL 參數中提取 地區名稱
      const cityName = req.params.city;
      // 從資料庫取得特定 ID 的景點資料
      const siteCity = await siteModel.findSiteByCity(cityName);
      // 如果找不到資料，回傳 404
      if (!siteCity) {
        return res.status(404).json({ message: "siteCity not found" });
      }
      // 成功取得資料後回傳 JSON 給前端
      res.json(siteCity);
    } catch (error) {
      // 錯誤處理
      console.error("Error fetching siteCity:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };