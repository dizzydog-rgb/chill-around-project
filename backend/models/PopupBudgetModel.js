const db = require("../config/database");
// 獲取特定編號景點的模組函數
exports.findPopupBudgetById = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM budgetcategory WHERE Bcategory_id = ?"; // 根據 sites 資料表的 id 欄位
        db.query(query, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            // 如果查詢結果有資料，返回第一筆
            resolve(results[0]);
        });
    });
};