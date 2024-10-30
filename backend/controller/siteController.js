const siteModel = require("../models/siteModel");
exports.getAllSite = async(req,res) =>{
    try {
        const allSiteResult =  await siteModel.findAllSite();
        res.json(allSiteResult)
    } catch (error) {
        console.error("獲取所有景點資料出問題：" + error);
    }
}
// 獲取所有美食店家資訊
exports.getAllFood = async(req,res) =>{
    try {
        const allFoodResult =  await siteModel.findAllFood();
        res.json(allFoodResult)
    } catch (error) {
        console.error("獲取所有美食店家資料出問題：" + error);
    }
}
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
// allsite隨機撈景點資料
exports.getRandomSite = async (req, res) => {
    await siteModel.findRandomSite()
        .then(site => {
            
            res.json(site);  // 返回 JSON 格式的資料
        })
        .catch(err => {
            console.error('查詢發生錯誤:', err);
            res.status(500).json({ error: '資料庫查詢失敗' + err.message});
        });
    
  };

// serchsite 熱門景點 隨機撈資料
exports.getRandomCard = async (req, res) => {
    siteModel.findRandomCard()
        .then(site => {
            res.json(site);  // 返回 JSON 格式的資料
        })
        .catch(err => {
            console.error('查詢發生錯誤:', err);
            res.status(500).json({ error: 'getRandomCard資料庫查詢失敗' });
        });
    
  };

// 根據使用者選取的內容撈資料
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

exports.getsearchSite = async(req, res) => {
    const region = req.query.site_city; // 提取城市參數
    const tag = req.query.tag_id; // 提取標籤 ID 參數
    // const { region, tag } = req.query; // 假設地區和標籤是從查詢字符串獲取的
    try {
        const results = await siteModel.findSearchSite(region, tag);
        // res.json(attractions);
        // 將數據作為JSON響應
        res.json(results);
    } catch (error) {
        console.error('搜尋失敗', error);
        if (!res.headersSent) { // 檢查響應是否已發送
            res.status(500).json({ error: '伺服器錯誤' });
        }
    }
};

exports.addFoodSite = async(req,res) =>{
    const {id,name,formatted_address,formatted_phone_number,photos,vicinity,opening_hours_text,types} = req.body;
    console.log(req.body); // 回傳的資料
    try {
        // // 確保 photos 是一個數組，否則會導致錯誤
        // if (photos && Array.isArray(photos) && photos.length > 0) {
        //     // 確保在使用 photos[0] 時 photos 的存在和長度正確
        //     console.log("第一張照片網址:", photos[0].getUrl());
        // } else {
        //     console.log("photos 不是一個有效的數組");
        // }

        // 如果照片存在，則處理照片和生成網址
        let photoUrls = [];
        if (photos && Array.isArray(photos)) {
            photoUrls = photos.map(photo => {
                // 假設 photos 物件有一個 `getUrl` 方法可用來產生 URL
                return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyDMP0WUTPIwj9oi3SbbROwXL0STHfmKQuQ`;
            });
        } else {
            console.log("未提供任何照片");
        }

        // 根據接收到的資料創建一個place對象，可以根據需要更改形狀
        const place = {
            id,
            name,
            formatted_address,
            formatted_phone_number,
            photos,
            vicinity,
            opening_hours_text,
            types,
        };
        


        // 將資料傳遞到資料庫模型
        const addFoodSiteResult = await siteModel.addFoodSiteData(place);
        res.json(addFoodSiteResult);
    } catch (error) {
        console.error("存入美食地圖店家出問題：" + error);
        res.status(500).json({ error: "伺服器錯誤，無法儲存" });
    }

}

//景點加入行程
exports.getSchedulesAndSites = async (req, res) => {
    try {
        const [schedules, sites] = await Promise.all([
            schInfoModel.getScheduleData(),
            schInfoModel.getSiteData()
        ]);
        res.json({ schedules, sites });
    } catch (err) {
        console.error('景點查詢失敗:', err);
        res.status(500).send('景點查詢失敗');
    }
};
//景點post
exports.addSchedule = async (req, res) => {
    const { sch_id, sch_day, sch_order, sch_spot } = req.body;
    try {
        await schInfoModel.addScheduleDetail(sch_id, sch_day, sch_order, sch_spot);
        res.send('資料保存成功');
    } catch (err) {
        console.error('新增行程資料失敗:', err);
        res.status(500).send('資料新增失敗');
    }
};