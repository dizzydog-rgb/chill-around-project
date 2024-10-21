const indexModel = require("../models/indexModel");


//輪播圖
exports.getHeroImg = async (req, res) => {
    try {
        const heroImg = req.params.hero
        const myHero = await indexModel.findHero(heroImg);
        // 如果找不到資料，回傳 404
        if (!myHero) {
            return res.status(404).json({ message: "Site not found" });
        }
        // 成功取得資料後回傳 JSON 給前端
        res.json(myHero);
    } catch (error) {
        console.error("Error fetching site:", error);
        res.status(500).json({ message: "Server Error" });
    }
}


//tag
exports.getHeroTag = async (req, res) => {
    try {
        const heroTag = req.params.name
        const myTag = await indexModel.findTag(heroTag);
        // 如果找不到資料，回傳 404
        if (!myTag) {
            return res.status(404).json({ message: "Site not found" });
        }
        // 成功取得資料後回傳 JSON 給前端
        res.json(myTag);
    } catch (error) {
        console.error("Error fetching site:", error);
        res.status(500).json({ message: "Server Error" });
    }
}