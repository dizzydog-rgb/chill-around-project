var db = require('../config/database');

exports.findTestById = (id) => {
    return new Promise((resolve, reject) => {
        // var sql = "SELECT * FROM `test_result` WHERE result_id = ?";
        var sql = `SELECT rs.result_id,my.result_style,rs.style_des,my.style_img ,bs.style_img AS best_style_img,
                    rs.country_name,rs.country_des,rs.country_img,tag1.tag_name AS style_tag_1,tag2.tag_name AS style_tag_2
                    FROM test_result AS rs
                    JOIN test_style AS my ON my.style_id = rs.result_style 
                    JOIN test_style AS bs ON bs.style_id = rs.best_style_img
                    JOIN all_tag AS tag1 ON tag1.tag_id = rs.style_tag_1
                    JOIN all_tag AS tag2 ON tag2.tag_id = rs.style_tag_2
                    WHERE rs.result_id = ?;`;
        db.exec(sql, [id], function (error,results, fields) {
            if (results && results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
}