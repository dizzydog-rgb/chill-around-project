const db = require("../config/database");
// 獲取特定編號預算種類的模組函數
exports.findUserBudgetId = (id) => {
    return new Promise((resolve, reject) => {
        const query1 = "SELECT * FROM userbudget WHERE sch_id = ?";
        const query2 = "SELECT SUM(Cost) AS TotalCost, SUM(CASE WHEN PaidStatus = 0 THEN Cost ELSE 0 END) AS TotalUnpaid, SUM(CASE WHEN PaidStatus = 1 THEN Cost ELSE 0 END) AS TotalPaid FROM userbudget WHERE sch_id = ? ";
        const query3 = "SELECT BudgetName, SUM(Cost) AS TotalByBudgetName FROM userbudget WHERE sch_id = ? GROUP BY BudgetName;"

        db.exec(query1, [id], (err1, results1) => {
            if (err1) {
                return reject(err1);
            }
            db.exec(query2, [id], (err2, results2) => {
                if (err2) {
                    return reject(err2);
                }
                db.exec(query3, [id], (err3, results3) => {
                    if (err3) {
                        return reject(err3);
                    }
                    resolve({ UserBudget: results1, TotalAndifPaid: results2, CategoryCost: results3 });
                });
            });
        });
    });
};

// 獲取全部預算種類 TEST
exports.findBudgetCategory = () => {
    return new Promise((resolve, reject) => {
        const query1 = "SELECT * FROM budgetcategory ORDER BY Bcategory_id ASC";
        const query2 = "SELECT * FROM budgetdetails";
        // console.log(query1);

        db.exec(query1, (err1, results1) => {
            if (err1) {
                return reject(err1);
            }

            db.exec(query2, (err2, results2) => {
                if (err2) {
                    return reject(err2);
                }

                resolve({ Category: results1, Details: results2 });
            });
        });
    });
};

// 使用者選取的資料區塊
exports.findUserBudgetOneDetails = (schId, DetailId) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM userbudget WHERE sch_id = ? AND Budget_id = ?";
        db.exec(query, [schId, DetailId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};


// 使用者編輯預算方塊
exports.userEditBudget = (schId, budgetId, budgetData) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM userbudget WHERE sch_id = ? AND Budget_id = ?";

        db.exec(query, [schId, budgetId], (err, currentBudget) => {

            console.log('Error:', err);
            console.log('崩潰卡比---------------------------------------------------', new Date().toLocaleTimeString())
            console.log('Current Budget:', currentBudget);
            // console.log('schId', schId);
            // console.log('budgetId', budgetId);

            if (err) {
                return reject(err);
            }
            if (!currentBudget || currentBudget.length === 0) {
                return reject(new Error('Budget not found.'));
            }

            const fieldsToUpdate = [];
            const values = [];

            // 更新 BudgetName 如果提供
            if (budgetData.BudgetName) {
                fieldsToUpdate.push("BudgetName = ?");
                values.push(budgetData.BudgetName);
            }
            // 更新 BudgetDetails 如果提供
            if (budgetData.BudgetDetails) {
                fieldsToUpdate.push("BudgetDetails = ?");
                values.push(budgetData.BudgetDetails);
            }
            // 更新 BudgetDate 如果提供
            if (budgetData.BudgetDate) {
                fieldsToUpdate.push("BudgetDate = ?");
                values.push(budgetData.BudgetDate);
            }
            // 更新 Cost 如果提供
            if (budgetData.Cost) {
                fieldsToUpdate.push("Cost = ?");
                values.push(budgetData.Cost);
            }
            // 更新 PaidStatus 如果提供
            if (budgetData.PaidStatus !== undefined) {
                fieldsToUpdate.push("PaidStatus = ?");
                values.push(budgetData.PaidStatus);
            }
            // 更新 WhoPay 如果提供
            if (budgetData.WhoPay) {
                fieldsToUpdate.push("WhoPay = ?");
                values.push(budgetData.WhoPay);
            }
            // 更新 BudgetContent 如果提供
            if (budgetData.BudgetContent) {
                fieldsToUpdate.push("BudgetContent = ?");
                values.push(budgetData.BudgetContent);
            }

            if (fieldsToUpdate.length === 0) {
                return reject(new Error('No fields to update.'));
            }

            console.log('我在這 -------------------------------------------------------------')
            console.log("Values:", values);

            // 添加 sch_id、Budget_id 到查詢參數
            values.push(schId, budgetId);

            // 建構更新查询
            const updateQuery = `UPDATE userbudget SET ${fieldsToUpdate.join(", ")} WHERE sch_id = ? AND Budget_id = ?`;
            console.log("Updating query:", values);
            console.log("Updating query:", updateQuery);

            db.exec(updateQuery, [...values, schId, budgetId], (err, result) => { // 傳遞 sch_id、budgetId
                console.log("Updating values 和 schId, budgetId:", [...values, schId, budgetId]);
                if (err) {
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    console.log("Updating query:", updateQuery);
                    console.log("Updating values 和 schId, budgetId:", [...values, schId, budgetId]);
                    console.log("Updating values:", values);
                    console.log("這裡是result.affectedRows", result.affectedRows);
                    // return reject(new Error('Budget not found.'));
                    console.error("No rows updated. Check if the budget exists and the data is different.");
                    return reject(new Error('No rows updated. Please check your data.'));
                }
                resolve('Budget updated!');
            });
        });
    });
};


// 編輯頁面 - 新增功能
exports.userAddBudget = (schId, data) => {
    return new Promise((resolve, reject) => {
        console.log("Data received in userAddBudget:", data); // 檢查接收到的資料

        // 首先查詢 Bcategory_id
        const categoryQuery = "SELECT Bcategory_id FROM budgetcategory WHERE BudgetName = ?";
        db.exec(categoryQuery, [data.BudgetName], (err, categoryResult) => {
            if (err) {
                return reject(err);
            }

            console.log("BudgetName to query:", data.BudgetName);

            // 確保找到了對應的 Bcategory_id
            if (categoryResult.length === 0) {
                return reject(new Error('No matching category found'));
            }

            const Bcategory_id = categoryResult[0].Bcategory_id;

            // 準備插入預算資料
            const budgetData = {
                sch_id: schId,
                BudgetDate: data.BudgetDate,
                BudgetDetails: data.BudgetDetails,
                BudgetContent: data.BudgetContent,
                BudgetName: data.BudgetName,
                Cost: data.Cost,
                PaidStatus: data.PaidStatus,
                WhoPay: data.WhoPay,
                Bcategory_id: Bcategory_id,
            };

            // 插入資料
            const query = "INSERT INTO userbudget (sch_id, BudgetDate, BudgetDetails, BudgetContent, BudgetName, Cost, PaidStatus, WhoPay, Bcategory_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            db.exec(query, [budgetData.sch_id, budgetData.BudgetDate, budgetData.BudgetDetails, budgetData.BudgetContent, budgetData.BudgetName, budgetData.Cost, budgetData.PaidStatus, budgetData.WhoPay, budgetData.Bcategory_id], (insertErr, result) => {
                if (insertErr) {
                    return reject(insertErr);
                }
                resolve('Budget added!');
            });
        });
    });
};




// 編輯頁面 - 刪除功能
exports.userDeleteBudget = (schId, budgetId) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM userbudget WHERE sch_id = ? AND Budget_id = ?";
        db.exec(query, [schId, budgetId], (err, result) => {
            console.log('崩潰卡比---------------------------------------------------', new Date().toLocaleTimeString());
            if (err) {
                return reject(err);
            }
            resolve('Budget deleted!', result);
        });
    });
};

