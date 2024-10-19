var db = require('../config/database');

exports.findEmailById = (id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `member` WHERE emailid = ?";
        db.exec(sql, [id], function (results, fields) {
            if (results && results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
}