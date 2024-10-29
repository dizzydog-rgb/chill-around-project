const db = require("../config/database");
// 獲取特定使用者的物品頁面的模組函數
exports.findUseritemListId = (id) => {
    return new Promise((resolve, reject) => {
        const query1 = "SELECT * FROM useritemlist WHERE sch_id = ?";
        const query2 = "SELECT ItemName, SUM(Quantity) AS CategoryPrepared FROM useritemlist WHERE sch_id = ? AND PrepareStatus = 1 GROUP BY ItemName;";
        const query3 = "SELECT ItemName, SUM(Quantity) AS TotalByitemName FROM useritemlist WHERE sch_id = ? GROUP BY itemName;";

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

                    // 組織數據，顯示每個 ItemName 及其總數
                    const formattedResults = results2.map(item => {
                        return {
                            ItemName: item.ItemName,
                            PreparedTotalQuantity: item.CategoryPrepared
                        };
                    });

                    resolve({ UseritemList: results1, CategoryPreparedTotal: formattedResults, CategoryTotal: results3 });
                });
            });
        });
    });
};


// 獲取全部物品種類 TEST
exports.findItemCategory = () => {
    return new Promise((resolve, reject) => {
        const query1 = "SELECT * FROM itemcategory ORDER BY Icategory_id ASC";
        const query2 = "SELECT * FROM itemdetails ORDER BY Icategory_id ASC";

        db.exec(query1, (err1, results1) => {
            if (err1) {
                return reject(err1);
            }
            db.exec(query2, (err2, results2) => {
                if (err2) {
                    return reject(err2);
                }

                resolve({
                    itemCategories: results1,
                    itemdetails: results2
                });
            });
        });
    });
};

// // 使用者選取的資料區塊
// exports.findUserBudgetOneDetails = (schId, DetailId) => {
//     return new Promise((resolve, reject) => {
//         const query = "SELECT * FROM userbudget WHERE sch_id = ? AND Budget_id = ?";
//         db.exec(query, [schId, DetailId], (err, result) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(result);
//         });
//     });
// };


// // 使用者編輯預算方塊
// exports.userEditBudget = (schId, budgetId, budgetData) => {
//     return new Promise((resolve, reject) => {
//         const query = "SELECT * FROM userbudget WHERE sch_id = ? AND Budget_id = ?";

//         db.exec(query, [schId, budgetId], (err, currentBudget) => {

//             console.log('Error:', err);
//             console.log('崩潰卡比---------------------------------------------------', new Date().toLocaleTimeString())
//             console.log('Current Budget:', currentBudget);
//             // console.log('schId', schId);
//             // console.log('budgetId', budgetId);

//             if (err) {
//                 return reject(err);
//             }
//             if (!currentBudget || currentBudget.length === 0) {
//                 return reject(new Error('Budget not found.'));
//             }

//             const fieldsToUpdate = [];
//             const values = [];

//             // 更新 BudgetName 如果提供
//             if (budgetData.BudgetName) {
//                 fieldsToUpdate.push("BudgetName = ?");
//                 values.push(budgetData.BudgetName);
//             }
//             // 更新 BudgetDetails 如果提供
//             if (budgetData.BudgetDetails) {
//                 fieldsToUpdate.push("BudgetDetails = ?");
//                 values.push(budgetData.BudgetDetails);
//             }
//             // 更新 BudgetDate 如果提供
//             if (budgetData.BudgetDate) {
//                 fieldsToUpdate.push("BudgetDate = ?");
//                 values.push(budgetData.BudgetDate);
//             }
//             // 更新 Cost 如果提供
//             if (budgetData.Cost) {
//                 fieldsToUpdate.push("Cost = ?");
//                 values.push(budgetData.Cost);
//             }
//             // 更新 PaidStatus 如果提供
//             if (budgetData.PaidStatus !== undefined) {
//                 fieldsToUpdate.push("PaidStatus = ?");
//                 values.push(budgetData.PaidStatus);
//             }
//             // 更新 WhoPay 如果提供
//             if (budgetData.WhoPay) {
//                 fieldsToUpdate.push("WhoPay = ?");
//                 values.push(budgetData.WhoPay);
//             }
//             // 更新 BudgetContent 如果提供
//             if (budgetData.BudgetContent) {
//                 fieldsToUpdate.push("BudgetContent = ?");
//                 values.push(budgetData.BudgetContent);
//             }

//             if (fieldsToUpdate.length === 0) {
//                 return reject(new Error('No fields to update.'));
//             }

//             console.log('我在這 -------------------------------------------------------------')
//             console.log("Values:", values);

//             // 添加 sch_id、Budget_id 到查詢參數
//             values.push(schId, budgetId);

//             // 建構更新查询
//             const updateQuery = `UPDATE userbudget SET ${fieldsToUpdate.join(", ")} WHERE sch_id = ? AND Budget_id = ?`;
//             console.log("Updating query:", values);
//             console.log("Updating query:", updateQuery);

//             db.exec(updateQuery, [...values, schId, budgetId], (err, result) => { // 傳遞 sch_id、budgetId
//                 console.log("Updating values 和 schId, budgetId:", [...values, schId, budgetId]);
//                 if (err) {
//                     return reject(err);
//                 }
//                 if (result.affectedRows === 0) {
//                     console.log("Updating query:", updateQuery);
//                     console.log("Updating values 和 schId, budgetId:", [...values, schId, budgetId]);
//                     console.log("Updating values:", values);
//                     console.log("這裡是result.affectedRows", result.affectedRows);
//                     // return reject(new Error('Budget not found.'));
//                     console.error("No rows updated. Check if the budget exists and the data is different.");
//                     return reject(new Error('No rows updated. Please check your data.'));
//                 }
//                 resolve('Budget updated!');
//             });
//         });
//     });
// };


// 編輯頁面 - 新增功能
exports.userAdditemCategory = (schId, data) => {
    return new Promise((resolve, reject) => {
        console.log("Data received in userAdditemCategory:", data);

        // 查詢所有匹配的 Icategory_id
        const categoryQuery = "SELECT Icategory_id FROM itemcategory WHERE ItemName = ?";
        db.exec(categoryQuery, [data.ItemName], (err, categoryResult) => {
            if (err) {
                return reject(err);
            }

            if (categoryResult.length === 0) {
                return reject(new Error('No matching category found'));
            }

            const Icategory_ids = categoryResult.map(row => row.Icategory_id);

            // 確保 ItemDetails 是數組
            const itemDetailsArray = Array.isArray(data.ItemDetails) ? data.ItemDetails : [];
            
            // 檢查 ItemDetails 是否為空
            if (itemDetailsArray.length === 0) {
                return reject(new Error('ItemDetails must be an array and cannot be empty'));
            }

            console.log("ItemDetails Array:", itemDetailsArray);

            const detailsCheckQuery = "SELECT ItemDetails FROM itemdetails WHERE ItemDetails IN (?)";
            db.exec(detailsCheckQuery, [itemDetailsArray], (checkErr, detailsResult) => {
                if (checkErr) {
                    return reject(checkErr);
                }

                const existingDetails = detailsResult.map(row => row.ItemDetails);
                const newDetails = itemDetailsArray.filter(detail => !existingDetails.includes(detail));

                // 如果有新 ItemDetails，則先插入到 itemdetails
                const insertDetailsPromises = newDetails.map(detail => {
                    return new Promise((resolveDetail, rejectDetail) => {
                        const insertDetailQuery = "INSERT INTO itemdetails (ItemDetails, Icategory_id) VALUES (?, ?)";
                        db.exec(insertDetailQuery, [detail, Icategory_ids[0]], (insertErr) => {
                            if (insertErr) {
                                return rejectDetail(insertErr);
                            }
                            resolveDetail();
                        });
                    });
                });

                Promise.all(insertDetailsPromises)
                    .then(() => {
                        const allDetailsQuery = "SELECT ItemDetails FROM itemdetails WHERE ItemDetails IN (?)";
                        db.exec(allDetailsQuery, [itemDetailsArray], (allDetailsErr, allDetailsResult) => {
                            if (allDetailsErr) {
                                return reject(allDetailsErr);
                            }

                            // 插入每個 ItemDetails 到 useritemlist
                            const insertPromises = allDetailsResult.map(row => {
                                return new Promise((resolveInsert, rejectInsert) => {
                                    const query = "INSERT INTO useritemlist (sch_id, ItemDetails, ItemName, PrepareStatus, Icategory_id) VALUES (?, ?, ?, ?, ?)";
                                    db.exec(query, [schId, row.ItemDetails, data.ItemName, data.PrepareStatus, Icategory_ids[0]], (insertErr) => {
                                        if (insertErr) {
                                            return rejectInsert(insertErr);
                                        }
                                        resolveInsert();
                                    });
                                });
                            });

                            // 等待所有插入完成
                            Promise.all(insertPromises)
                                .then(() => {
                                    resolve({ message: 'Items added!', Icategory_id: Icategory_ids });
                                })
                                .catch(reject);
                        });
                    })
                    .catch(reject);
            });
        });
    });
};





// // 編輯頁面 - 刪除功能
// exports.userDeleteBudget = (schId, budgetId) => {
//     return new Promise((resolve, reject) => {
//         const query = "DELETE FROM userbudget WHERE sch_id = ? AND Budget_id = ?";
//         db.exec(query, [schId, budgetId], (err, result) => {
//             console.log('崩潰卡比---------------------------------------------------', new Date().toLocaleTimeString());
//             if (err) {
//                 return reject(err);
//             }
//             resolve('Budget deleted!', result);
//         });
//     });
// };