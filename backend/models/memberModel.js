var db = require('../config/database');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!SECRET_KEY) {
    console.error('JWT_SECRET_KEY is not defined in the environment variables');
    process.exit(1); // 退出程序
}

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
                            token
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

exports.findEmail = (email) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `member` WHERE email = ?";
        db.exec(sql, [email], function (error, results, fields) {
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

exports.updateData = (userData) => {
    return new Promise((resolve, reject) => {
        var sql = "UPDATE `member` SET uname = ?, email = ?, password = ?, birthday = ?, sex = ?, address = ?, cellphone = ?, telephone = ? WHERE emailid = ?";
        var data = [
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
        // 如果 uphoto 存在，則添加到 SQL 語句和數據中
        if (userData.uphoto !== undefined) {
            sql = "UPDATE `member` SET uphoto = ?, " + sql.slice(31); // 在 SET 中添加 uphoto
            data.unshift(userData.uphoto); // 將 uphoto 添加到數據的開頭
        }

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
}