var db = require('../config/database');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!SECRET_KEY) {
    console.error('JWT_SECRET_KEY is not defined in the environment variables');
    process.exit(1); // 退出程序
}

// 會員登入的模組函數
exports.loginEmail = (member) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `member` WHERE email = ?;";
        var data = [member.inputAccount];
        db.exec(sql, data, function (error, results, fields) {
            if (error) {
                console.error("錯誤訊息:", error);
                reject(error);
                return;
            }
            if (results && results.length > 0) {
                // 找到了匹配的email，現在檢查密碼
                if (results[0].password === member.inputPassword) {
                    // 密碼匹配，更新 updated_at 並返回用戶信息
                    var updateSql = "UPDATE `member` SET updated_at=NOW() WHERE emailid = ?;";
                    db.exec(updateSql, [results[0].emailid], function (updateError) {
                        if (updateError) {
                            console.error("更新 updated_at 錯誤:", updateError);
                            reject({ error: "更新時間失敗" }); // 返回錯誤
                            return;
                        }
                        const token = jwt.sign(
                            {
                                id: results[0].emailid,
                                email: results[0].email
                            },
                            SECRET_KEY,
                            { expiresIn: '1h' }
                        );
                        resolve({
                            account: results[0].email,
                            token,
                            emailid: results[0].emailid
                        });
                    });
                } else {
                    // 密碼不匹配
                    resolve({ error: "密碼錯誤" });
                }
            } else {
                // 沒有找到匹配的email
                resolve({ error: "帳號不存在" });
            }
        });
    });
}

// 獲取會員資料的模組函數
exports.findEmail = (emailid) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `member` WHERE emailid = ?";
        db.exec(sql, [emailid], function (error, results, fields) {
            if (error) {
                console.error("錯誤訊息:", error);
                reject(error);
                return;
            }

            if (results) {
                resolve(results[0]);
            } else {
                console.error("No results found or query error:" + error);
                resolve(null);
            }
        });
    });
}

// 查詢是否有該會員的模組函數
exports.emailExists = (email) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `member` WHERE email = ?";
        db.exec(sql, [email], function (error, results) {
            if (error) {
                console.error("查詢電子郵件錯誤:", error);
                reject(error);
                return;
            }
            resolve(results.length > 0); // 如果找到結果，返回 true
        });
    });
};

// 註冊會員的模組函數
exports.registerData = async (user) => {
    // 檢查密碼是否一致
    if (user.pw1 !== user.pw2) {
        return { error: "密碼不一致。" }; // 返回錯誤消息
    }

    const exists = await exports.emailExists(user.email);
    if (exists) {
        return { error: "該電子郵件已經註冊過了。" }; // 返回錯誤消息
    }

    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO `member`(uname,email,password) VALUES (?,?,?)";
        var data = [user.uname, user.email, user.pw1];
        db.exec(sql, data, function (error, results, fields) {
            if (error) {
                console.error("錯誤訊息:", error);
                reject(error);
                return;
            }
            if (results.insertId) { // 確保插入成功
                // 根據 insertId 查詢新插入的用戶資料
                var sql = "SELECT * FROM `member` WHERE emailid = ?";
                db.exec(sql, [results.insertId], function (selectError, userResults) {
                    if (selectError) {
                        console.error("查詢用戶資料錯誤:", selectError);
                        reject(selectError);
                        return;
                    }
                    if (userResults && userResults.length > 0) {
                        const token = jwt.sign(
                            {
                                id: userResults[0].emailid,
                                email: userResults[0].email
                            },
                            SECRET_KEY,
                            { expiresIn: '1h' }
                        );
                        resolve({
                            account: userResults[0].email,
                            token
                        });
                    } else {
                        resolve(null); // 如果查詢不到用戶資料
                    }
                });
            } else {
                resolve(null); // 如果沒有插入 ID
            }
        });
    });
}

// 更新會員資料的模組函數
exports.updateData = (userData) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `member` WHERE emailid = ?";
        var id = userData.emailid
        var uphoto;
        db.exec(sql, [id], function (error, results, fields) {
            if (error) {
                console.error("錯誤訊息:", error);
                reject(error);
                return;
            }

            // 確保查詢結果存在
            if (results.length === 0) {
                return resolve({ error: '未找到該會員' });
            }

            if (userData.uphoto == undefined) {
                uphoto = results[0].uphoto;
            } else {
                uphoto = userData.uphoto;
            }

            sql = "UPDATE `member` SET uphoto = ?, uname = ?, email = ?, password = ?, birthday = ?, sex = ?, address = ?, cellphone = ?, telephone = ? WHERE emailid = ?";
            const data = [
                uphoto,
                userData.uname,
                userData.email,
                userData.pwd,
                userData.birthday,
                userData.sex,
                userData.address,
                userData.cellphonenum,
                userData.telephonenum,
                userData.emailid
            ];
            db.exec(sql, data, function (error, results, fields) {
                if (error) {
                    console.error("錯誤訊息:", error);
                    reject(error);
                    return;
                }
                if (results.affectedRows > 0) { // 確保有行被更新
                    resolve({ success: true }); // 返回成功的結果
                } else {
                    resolve({ error: '資料更新失敗' });
                }
            });
        });
    });
}

// 獲取所有行程的模組函數
exports.findAllSchedule = (pagedata) => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT
            s.*,
            m.uname,
            sd.sch_spot,
            si.photo_one
        FROM
            schedule s
            INNER JOIN schedule_details sd ON s.sch_id = sd.sch_id
            INNER JOIN sites si ON sd.sch_spot = si.site_name
            INNER JOIN \`member\` m ON s.emailid = m.emailid
        WHERE
        sd.detail_id = (
            SELECT MIN(detail_id)
            FROM schedule_details
            WHERE sch_id = s.sch_id
        ) AND s.emailid = ?
        ORDER BY s.sch_id
        LIMIT ?, ?
        `;

        const pageData = [pagedata.emailid, pagedata.offset, pagedata.nums_per_page];

        db.exec(sql, pageData, (error, data, fields) => {
            if (error) {
                console.error("SQL Error:", error); // 輸出 SQL 錯誤
                reject(error);
                return;
            }
            const countSql = `
            SELECT
                COUNT(*) AS COUNT
            FROM
                schedule s
                INNER JOIN schedule_details sd ON s.sch_id = sd.sch_id
                INNER JOIN sites si ON sd.sch_spot = si.site_name
                INNER JOIN \`member\` m ON s.emailid = m.emailid
            WHERE
            sd.detail_id = (
                SELECT MIN(detail_id)
                FROM schedule_details
                WHERE sch_id = s.sch_id
            ) AND s.emailid = ?
            `;
            db.exec(countSql, [pagedata.emailid], (error, nums, fields) => {
                if (error) {
                    console.error("錯誤訊息:", error);
                    reject(error);
                    return;
                }
                if (nums && nums.length > 0) {
                    const totalCount = nums[0].COUNT;
                    const lastPage = Math.ceil(nums[0].COUNT / pagedata.nums_per_page);

                    resolve({
                        data: data,
                        page: pagedata.page,
                        totalCount: totalCount,
                        lastPage: lastPage
                    });
                } else {
                    resolve({ data, totalCount: 0, lastPage: 0 }); // 如果沒有資料
                }
            });
        });
    });
};