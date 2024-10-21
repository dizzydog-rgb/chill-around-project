var db = require('../config/database');

exports.findTestById = (id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `test_result` WHERE result_id = ?";
        db.exec(sql, [id], function (results, fields) {
            if (results && results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
}