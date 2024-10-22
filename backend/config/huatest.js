// const mysql = require("mysql");

<<<<<<< HEAD
// 創建資料庫連接
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'huatest'
});
=======
// // 創建資料庫連接
// const db = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'huatest'
// });
>>>>>>> a1f5e16a3bb6a222be0f2ae65dd0b963f447834f

// // 連接到資料庫
// db.connect((err) => {
//     if (err) {
//         console.error("資料庫連接失敗: " + err.stack);
//         return;
//     }
//     console.log("這裡是config測試：資料庫連結成功QQ pikakaaaa " + new Date().toLocaleTimeString());
// });

// // 導出連接
// module.exports = db;