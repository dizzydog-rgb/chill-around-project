const popupBudgetModel = require("../models/popupBudgetModel");
// 獲取特定物品種類的控制器
exports.getUserBudgetID = async (req, res) => {
    try {
        // 從 URL 參數中提取 ID
        const popupBudgetId = req.params.id;
        // const popupBudgetId = parseInt(req.params.id, 10);

        // 從資料庫取得特定 ID 的景點資料
        const popupBudget = await popupBudgetModel.findUserBudgetId(popupBudgetId);
        // 如果找不到資料，回傳 404
        if (!popupBudget) {
            return res.status(404).json({ message: "PopupBudget not found" });
        }
        // 成功取得資料後回傳 JSON 給前端
        res.json(popupBudget);
    } catch (error) {
        // 錯誤處理
        console.error("Error fetching PopupBudget:", error);
        // res.status(500).json({ message: "Server Error" });
    }
};

// 獲得全部種類的控制器
exports.getBudgetCategory = async (req, res) => {
    try {
        const popupBudgets = await popupBudgetModel.findBudgetCategory();
        res.json(popupBudgets);
    } catch (error) {
        console.error("Error fetching PopupBudgets:", error);
        res.status(500).json({ message: "getAllPopupBudgets Server Error" });
    }
};