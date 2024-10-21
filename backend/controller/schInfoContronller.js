const schInfoModel = require("../models/schInfoModel");

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