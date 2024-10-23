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
        var sql = `SELECT * FROM \`member\` WHERE email=?;`;
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
                    var updateSql = `UPDATE \`member\` SET updated_at=NOW() WHERE emailid=?;`;
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
                            id: results[0].emailid,
                            account: results[0].email,
                            updated_at: new Date(),
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

exports.registerData = (user) => {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO `member`(uname,email,password) VALUES (?,?,?)";
        var data = [user.uname,user.email,user.pw2];
        db.exec(sql, data, function (error, results, fields) {
            if (error) {
                console.error("錯誤訊息:", error);
                reject(error);
                return;
            }
            if (results) {
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
                    password: results[0].password,
                    token
                });
            } else {
                console.error("No results found or query error:" + error);
                resolve(null);
            }
        });
    });
}