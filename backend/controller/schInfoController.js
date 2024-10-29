const schInfoModel = require("../models/schInfoModel");

exports.getSiteInfo = async (req, res) => {
    try {
        const siteInfo = req.params.site
        const mySite = await schInfoModel.findSite(siteInfo);
        // 如果找不到資料，回傳 404
        if (!mySite) {
            return res.status(404).json({ message: "Site not found" });
        }
        // 成功取得資料後回傳 JSON 給前端
        res.json(mySite);
    } catch (error) {
        console.error("Error fetching site:", error);
        res.status(500).json({ message: "Server Error" });
    }
}


// 獲取旅行計畫資料帶入完成頁面
exports.getScheduleById = async (req, res) => {
    try {
        // 從 URL 參數中提取 ID
        const scheduleId = req.params.id;
        // 從資料庫取得所有的行程資料
        const schedule = await schInfoModel.findScheduleById(scheduleId);
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


//已建立好的行程資料
exports.getSch = async (req, res) => {
    const regions = req.query.site_city; // 提取城市參數
    const tags = req.query.tag_id; // 提取標籤 ID 參數


    try {
        const attractions = await schInfoModel.getScheduleCardData(regions, tags);
        res.json(attractions);
    } catch (err) {
        console.error('會員行程查詢失敗:', err);
        res.status(500).send('會員行程查詢失敗');
    }

};


//景點加入行程
exports.getSchedulesAndSites = async (req, res) => {
    const emailid = req.params.emailid; // 確保你從請求中獲取 emailid
    try {
        const [schedules, sites] = await Promise.all([
            schInfoModel.getScheduleData(emailid), // 將 emailid 傳遞給該函數
            schInfoModel.getSiteData()
        ]);
        res.json({ schedules, sites });
    } catch (err) {
        console.error('景點查詢失敗:', err);
        res.status(500).send('景點查詢失敗');
    }
};


//加入我的最愛
exports.addSchToLike = async (req, res) => {
    const { emailid, sch_id } = req.body; // 獲取 sch_id
    try {
        await schInfoModel.addScheduleId(emailid, sch_id); // 只傳入 sch_id
        res.send('資料保存成功'); // 可以加上其他成功訊息或數據
    } catch (err) {
        console.error('新增行程資料失敗:', err);
        res.status(500).send('資料新增失敗');
    }
};

//移除我的最愛
exports.removeSchFromLike = async (req, res) => {
    const { emailid, sch_id } = req.body; // 從請求中解構 emailid 和 sch_id

    try {
        const result = await schInfoModel.deleteScheduleId(emailid, sch_id); // 呼叫 model 的刪除方法
        if (result.affectedRows > 0) { // 驗證是否有資料刪除
            res.send('資料刪除成功');
        } else {
            res.status(404).send('資料未找到');
        }
    } catch (err) {
        console.error('刪除行程資料失敗:', err);
        res.status(500).send('資料刪除失敗');
    }
};

// 獲取用戶已加 Like 的行程
exports.getLikedItems = async (req, res) => {
    const emailid = req.query.emailid; // 從查詢參數獲取用戶 ID
    try {
        const likedItems = await schInfoModel.getLikedItems(emailid);
        res.json(likedItems); // 返回已加 Like 的項目列表
    } catch (err) {
        console.error('獲取已加 Like 的項目失敗:', err);
        res.status(500).send('獲取資料失敗');
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


//youtube 連結
exports.getVideoUrl = async (req, res) => {
    try {
        const ytlink = req.params.yt
        const myVideo = await schInfoModel.findVideo(ytlink);
        // 如果找不到資料，回傳 404
        if (!myVideo) {
            return res.status(404).json({ message: "video not found" });
        }
        // 成功取得資料後回傳 JSON 給前端
        res.json(myVideo);
    } catch (error) {
        console.error("Error fetching site:", error);
        res.status(500).json({ message: "Server Error" });
    }
}