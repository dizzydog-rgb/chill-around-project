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


        // db.exec(query1, [id], (err1, results1) => {
        //     if (err1) {
        //         console.error("Query error:", err1);
        //         return reject(err1); // 錯誤處理
        //     }
        //     if (results1 && results1.length > 0) {
        //         resolve(results1[0]); // 返回所有查詢結果
        //     } else {
        //         console.error("No results found");
        //         reject(new Error("No results found")); // 處理無結果的情況
        //     }
        // });

        // 抓旅遊編輯的版本，跑得出資料，GPT不推薦
        // db.exec(query1, [id], (results1, fields) => {
        //     if (results1) {
        //       resolve(results1);
        //     } else {
        //       console.error("No results found or query error");
        //       reject(new Error("No results found or query error"));
        //     }
        //   }); 

        // 原版
        // db.exec(query1, [id], (err1, results1) => {
        //     if (err1) {
        //         return reject(err1);
        //     }
        //     
        //     resolve(results1);
        // });
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

// 編輯頁面 - 新增功能
exports.userAddBudget = (budgetData) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Budgets (BudgetDate, BudgetDetails, BudgetName, Cost, PaidStatus, WhoPay) VALUES (?, ?, ?, ?, ?, ?)";
        db.exec(query, [budgetData.BudgetDate, budgetData.BudgetDetails, budgetData.BudgetName, budgetData.Cost, budgetData.PaidStatus, budgetData.WhoPay], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve('Budget added!');
        });
    });
};


// 編輯頁面 - 編輯功能
exports.userEditBudget = (id, budgetData) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Budgets SET BudgetDate = ?, BudgetDetails = ?, BudgetName = ?, Cost = ?, PaidStatus = ?, WhoPay = ? WHERE BudgetID = ?";
        db.exec(query, [budgetData.BudgetDate, budgetData.BudgetDetails, budgetData.BudgetName, budgetData.Cost, budgetData.PaidStatus, budgetData.WhoPay, id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve('Budget updated!');
        });
    });
};

// 編輯頁面 - 刪除功能
exports.userDeleteBudget = (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM Budgets WHERE BudgetID = ?";
        db.exec(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve('Budget deleted!');
        });
    });
};

