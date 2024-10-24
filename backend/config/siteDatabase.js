//連接景點資訊資料庫
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: '127.0.0.1', // 你的資料庫主機
//     port:'8889',
//     user: 'root', // 資料庫用戶
//     password: 'root', // 資料庫密碼
//     database: 'chill_around' // 資料庫名稱
// });
// // 連接到資料庫
// connection.connect((err) => {
//     if (err) {
//         console.log('----皮卡資料連接異常----');
//         console.error('Error connecting to the database: ' + err.stack);
//         console.error('異常內容: ' + err.sqlMessage);
//         console.log('----皮卡資料連接異常----');
//         return;
//     }else{
//         console.log('----皮卡資料連接正常----');
//         console.log('Connected as id ' + connection.threadId);

//     }
    
// });

// module.exports = connection; // 確保這裡導出的是 connection

// 良錦提供
// var mysql  = require('mysql');

// exports.exec = (sql,data,callback) => {
//     const connection = mysql.createConnection({
//         host:'127.0.0.1', // 你的資料庫主機
//         port:'8889',
//         user: 'root', // 資料庫用戶
//         password: 'root', // 資料庫密碼
//         database: 'chill_around', // 資料庫名稱
//         multipleStatements: true,
//     });
//     connection.connect();

//     connection.query(sql,data,function(error,results,fields){
//         if(error) {
//             console.log('----皮卡資料連接異常----');
//             console.log(error);
//             console.error('異常內容: ' + error.sqlMessage);
//             console.log('----皮卡資料連接異常----');
//         };
//         console.log('----皮卡資料連接正常----');
//         callback(results, fields);
//     })
//         connection.end();
// }

// database.js 查詢cahtgpt =>差異callback多一個null callback(null, results, fields);
var mysql1 = require('mysql');

exports.exec = (sql, data, callback) => {
    const connection = mysql1.createConnection({
        host: 'localhost',
        port: '8889',
        user: 'root',
        password: 'root',
        database: 'chill_around',
        multipleStatements: true,
    });

    connection.connect();

    connection.query(sql, data, function (error, results, fields) {
        if (error) {
            console.log('----皮卡資料連接異常----');
            console.log(error);
            console.log('異常內容: ' + error.sqlMessage);
            console.log('----皮卡資料連接異常----');
            connection.end(); // 儘早結束連接
            return callback(error, null); // 返回錯誤
        }
        console.log('----皮卡資料連接正常----');
        callback(null, results, fields); // 返回結果
        connection.end(); // 在此處結束連接
    });
};
