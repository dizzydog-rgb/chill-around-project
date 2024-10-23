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

// 編輯方塊可編輯(UPDATE)
// exports.findUserBudgetOneDetails = (scheduleId, BudgetOneDetailId) => {
//     return new Promise((resolve, reject) => {
//         const query = "SELECT * FROM userbudget WHERE sch_id = ? AND Budget_id = ?";

//         db.exec(query, [scheduleId, BudgetOneDetailId], (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve({results});
//         });
//     });
// };
exports.updateUserBudgetDetails = (scheduleId, BudgetOneDetailId, updateData) => {
    return new Promise((resolve, reject) => {
        // 查詢當前預算資料
        const querySelect = "SELECT * FROM userbudget WHERE sch_id = ? AND Budget_id = ?";
        db.exec(querySelect, [scheduleId, BudgetOneDetailId], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return reject(new Error("該預算項目不存在"));
            }

            // 更新預算資料
            const { BudgetDate, BudgetDetails, BudgetName, Cost, PaidStatus, WhoPay } = updateData;
            const queryUpdate = `
                UPDATE userbudget 
                SET 
                    BudgetDate = ?, 
                    BudgetDetails = ?, 
                    BudgetName = ?, 
                    Cost = ?, 
                    PaidStatus = ?, 
                    WhoPay = ? 
                WHERE 
                    sch_id = ? AND Budget_id = ?;
            `;
            db.exec(queryUpdate, [BudgetDate, BudgetDetails, BudgetName, Cost, PaidStatus, WhoPay, scheduleId, BudgetOneDetailId], (errUpdate, updateResult) => {
                if (errUpdate) {
                    return reject(errUpdate);
                }
                resolve({ results, updated: updateResult });
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

