var db = require('../config/database');

exports.loginEmail = (member) => {
    return new Promise((resolve, reject) => {
        var sql = `UPDATE \`member\` SET updated_at=NOW() WHERE email=? and password=?;
                SELECT * FROM \`member\` WHERE email=? and password=?;`
        var data = [member.inputAccount, member.inputPassword, member.inputAccount, member.inputPassword];
        db.exec(sql, data, function (error, results, fields) {
            if (error) {
                console.error("錯誤訊息:", error);
                reject(error);
                return;
            }
            if (results && results[1] && results[1][0]) {
                resolve({
                    id: results[1][0].emailid,
                    account: results[1][0].email,
                    updated_at: results[1][0].updated_at
                });
            } else {
                console.error("No results found or query error:" + error);
                resolve(null);
            }
        });
    });
}

exports.findEmailById = (id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `member` WHERE emailid = ?";
        db.exec(sql, [id], function (error, results, fields) {
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