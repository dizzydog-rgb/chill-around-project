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
// exports.getSiteByCity = async (req, res) => {
//     try {
//       // 從 URL 參數中提取 地區名稱
//       const cityName = req.params.city;
//       // 從資料庫取得特定 ID 的景點資料
//       const siteCity = await siteModel.findSiteByCity(cityName);
//       // 如果找不到資料，回傳 404
//       if (!siteCity) {
//         return res.status(404).json({ message: "siteCity not found" });
//       }
//       // 成功取得資料後回傳 JSON 給前端
//       res.json(siteCity);
//     } catch (error) {
//       // 錯誤處理
//       console.error("Error fetching siteCity:", error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   };
// 用隨機撈資料
exports.getRandomSite = async (req, res) => {
    siteModel.findRandomSite()
        .then(site => {
            
            res.json(site);  // 返回 JSON 格式的資料
        })
        .catch(err => {
            console.error('查詢發生錯誤:', err);
            res.status(500).json({ error: '資料庫查詢失敗' });
        });
    
  };

exports.getSiteTag = async (req, res) => {
    const regions = req.query.site_city; // 提取城市參數
    const tags = req.query.tag_id; // 提取標籤 ID 參數
    // const { regions, tags } = req.query; // 假設地區和標籤是從查詢字符串獲取的
    try {
        const attractions = await siteModel.findSiteTag(regions, tags);
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
  };