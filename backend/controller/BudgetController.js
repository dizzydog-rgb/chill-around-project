const BudgetModel = require("../models/BudgetModel");
// 獲得全部預算種類的控制器
exports.getBudgetCategory = async (req, res) => {
    try {
        const popupBudgets = await BudgetModel.findBudgetCategory();
        res.json(popupBudgets);
    } catch (error) {
        console.error("Error fetching PopupBudgets:", error);
        res.status(500).json({ message: "getAllPopupBudgets Server Error" });
    }
};


// 獲取使用者預算的控制器
exports.getUserBudgetID = async (req, res) => {
    try {
        // 從 URL 參數中提取 ID
        // const UserBudgetId = parseInt(req.params.id, 10);
        const UserBudgetId = req.params.id;
        console.log("Fetching Budget with ID:", UserBudgetId);

        // 從資料庫取得特定 ID 的景點資料
        const UserBudget = await BudgetModel.findUserBudgetId(UserBudgetId);
        console.log("UserBudgets data fetched:", UserBudget);
        // 如果找不到資料，回傳 404
        if (!UserBudget) {
            return res.status(404).json({ message: "UserBudgets not found" });
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

// 取得使用者選取的預算資料方塊（編輯頁）的控制器
exports.getUserBudgetOneDetails = async (req, res) => {
    try {
        const schId = req.params.id;
        const BudgetOneDetailId = req.params.detailId;

        console.log("Fetching One Budget with ID:", schId, BudgetOneDetailId);

        const BudgetOneDetail = await BudgetModel.findUserBudgetOneDetails(schId, BudgetOneDetailId);
        console.log("進入使用者選擇的編輯方塊:", BudgetOneDetail);

        if (!BudgetOneDetail) {
            return res.status(404).json({ message: "UserBudgets not found" });
        }
        res.json(BudgetOneDetail);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 編輯預算的控制器
exports.userEditBudgetController = (req, res) => {
    const schId = req.params.id; // 提取 schId
    const budgetId = req.params.detailId; // 提取 budgetId

    const budgetData = {
        BudgetDate: req.body.BudgetDate,
        BudgetDetails: req.body.BudgetDetails,
        BudgetName: req.body.BudgetName,
        BudgetContent: req.body.BudgetContent,
        Cost: req.body.Cost,
        PaidStatus: req.body.PaidStatus,
        WhoPay: req.body.WhoPay,
    };

    BudgetModel.userEditBudget(schId, budgetId, budgetData)
        .then(message => res.send(message))
        .catch(err => res.status(500).send(err));
};

// 刪除預算的控制器
exports.userDeleteBudgetController = (req, res) => {
    const schId = req.params.id; // 獲取預算ID
    const budgetId = req.params.detailId; // 獲取詳細ID
    BudgetModel.userDeleteBudget(schId, budgetId)
        .then(message => res.send(message))
        .catch(err => res.status(500).send(err));
};

// 增加預算的控制器
exports.userAddBudgetController = (req, res) => {
    const schId = req.params.id; // 獲取預算ID

    const budgetData = {
        BudgetDate: req.body.BudgetDate,
        BudgetDetails: req.body.BudgetDetails,
        BudgetName: req.body.BudgetName,
        BudgetContent: req.body.BudgetContent,
        Cost: req.body.Cost,
        PaidStatus: req.body.PaidStatus,
        WhoPay: req.body.WhoPay,
    };
    BudgetModel.userAddBudget(schId, budgetData)
        .then(message => res.status(201).send(message))
        .catch(err => res.status(500).send(err));
};
