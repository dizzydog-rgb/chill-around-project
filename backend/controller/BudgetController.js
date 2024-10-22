const BudgetModel = require("../models/BudgetModel");
// 獲取特定物品種類的控制器
exports.getUserBudgetID = async (req, res) => {
    try {
        // 從 URL 參數中提取 ID
        // const UserBudgetId = parseInt(req.params.id, 10);
        const UserBudgetId = req.params.id;
        console.log("Fetching Budget with ID:", UserBudgetId);
        
        // 從資料庫取得特定 ID 的景點資料
        const UserBudget = await BudgetModel.findUserBudgetId(UserBudgetId);
        console.log("PopupBudget data fetched:", UserBudget);
        // 如果找不到資料，回傳 404
        if (!UserBudget) {
            return res.status(404).json({ message: "PopupBudget not found" });
        }
        // 成功取得資料後回傳 JSON 給前端
        // console.log("PopupBudget data to send:", UserBudget);
        // res.json({ data: UserBudget });
        res.json(UserBudget);
    } catch (error) {
        // 錯誤處理
        // console.error("Error fetching PopupBudget:", error);
        // res.status(500).json({ message: "Server Error" });
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 獲得全部種類的控制器
exports.getBudgetCategory = async (req, res) => {
    try {
        const popupBudgets = await BudgetModel.findBudgetCategory();
        res.json(popupBudgets);
    } catch (error) {
        console.error("Error fetching PopupBudgets:", error);
        res.status(500).json({ message: "getAllPopupBudgets Server Error" });
    }
};