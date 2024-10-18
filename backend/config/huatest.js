const mysql = require("mysql");

// 創建資料庫連接
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'huatest'
});

// 連接到資料庫
db.connect((err) => {
    if (err) {
        console.error("資料庫連接失敗: " + err.stack);
        return;
    }
    console.log("這裡是config測試：資料庫連結成功QQ pikakaaaa " + new Date().toLocaleTimeString());
});

// 導出連接
module.exports = db;