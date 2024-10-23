const db = require("../config/database");
// 獲取特定編號預算種類的模組函數
exports.findUserBudgetId = (id) => {
    return new Promise((resolve, reject) => {
        const query1 = "SELECT * FROM userbudget WHERE sch_id = ?";
        const query2 = "SELECT SUM(Cost) AS TotalCost, SUM(CASE WHEN PaidStatus = 0 THEN Cost ELSE 0 END) AS TotalUnpaid, SUM(CASE WHEN PaidStatus = 1 THEN Cost ELSE 0 END) AS TotalPaid FROM userbudget WHERE sch_id = ? ";
        const query3 = "SELECT BudgetName, SUM(Cost) AS TotalByBudgetName FROM userbudget WHERE sch_id = ? GROUP BY BudgetName;"

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

        // 原版 跑不出資料
        db.exec(query1, [id], (err1, results1) => {
            if (err1) {
                return reject(err1);
            }
            // 如果查詢結果有資料，返回第一筆
            resolve(results1);
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
