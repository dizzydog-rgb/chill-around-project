const schInfoModel = require("../models/schInfoModel");

//景點加入行程
exports.getSchedulesAndSites = async (req, res) => {
    try {
        const [schedules, sites] = await Promise.all([
            schInfoModel.getScheduleData(),
            schInfoModel.getSiteData()
        ]);
        res.json({ schedules, sites });
    } catch (err) {
        console.error('查詢失敗:', err);
        res.status(500).send('資料查詢失敗');
    }
};


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