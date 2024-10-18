const PopupBudgetModel = require("../models/PopupBudgetModel");
// 獲取特定景點資料的控制器
exports.getPopupBudgetById = async (req, res) => {
    try {
        // 從 URL 參數中提取 ID
        const PopupBudgetId = req.params.id;
        // 從資料庫取得特定 ID 的景點資料
        const PopupBudget = await PopupBudgetModel.findPopupBudgetById(PopupBudgetId);
        // 如果找不到資料，回傳 404
        if (!PopupBudget) {
            return res.status(404).json({ message: "PopupBudget not found" });
        }
        // 成功取得資料後回傳 JSON 給前端
        res.json(PopupBudget);
    } catch (error) {
        // 錯誤處理
        console.error("Error fetching PopupBudget:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


