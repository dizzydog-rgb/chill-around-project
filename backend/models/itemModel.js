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


// 新增物品大種類
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


// 編輯物品細項
exports.updateUserItemDetails = (id, data) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE useritemlist 
            SET 
                ItemName = ?, 
                ItemDetails = ?, 
                Quantity = ?, 
                PrepareStatus = ?, 
                Total = ? 
            WHERE 
                sch_id = ? AND 
                ItemList_id = ?`;

        const values = [data.ItemName, data.ItemDetails, data.Quantity, data.PrepareStatus, data.Total, data.sch_id, data.ItemList_id];
        console.log('Executing query:', query, 'with values:', values);

        db.exec(query, [data.ItemName, data.ItemDetails, data.Quantity, data.PrepareStatus, data.Total, data.sch_id, data.ItemList_id], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return reject(err);
            }
            console.log('Query result:', result);
            resolve(result);
        });
    });
};


// 新增物品細項
exports.userAdditemDetails = (data) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO useritemlist (PrepareStatus, Quantity, sch_id, ItemName, ItemDetails, Total, Icategory_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.PrepareStatus,
            data.Quantity,
            data.sch_id,
            data.ItemName,
            data.ItemDetails,
            data.Total,
            data.Icategory_id
        ];

        db.exec(query, values, (error, results) => {
            if (error) {
                console.error('新增失敗', error);
                return reject(error);
            }
            resolve({ insertId: results.insertId });
        });
    });
};

// 刪除物品細項
exports.deleteUserItemDetails = (sch_id, itemListId) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM useritemlist WHERE sch_id = ? AND ItemList_id = ?`;
        db.exec(query, [sch_id, itemListId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};


// 刪除物品大種類
exports.deleteUserItemAllCategory = (sch_id, Icategory_id) => {
    return new Promise((resolve, reject) => {
        const deleteDetailsQuery = `DELETE FROM useritemlist WHERE sch_id = ? AND Icategory_id = ?`;
        db.exec(deleteDetailsQuery, [sch_id, Icategory_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};
