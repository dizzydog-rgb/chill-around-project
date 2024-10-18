// 連接景點資訊資料庫
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1', // 你的資料庫主機
    port:'8889',
    user: 'root', // 資料庫用戶
    password: 'root', // 資料庫密碼
    database: 'chill_around' // 資料庫名稱
});
// 連接到資料庫
connection.connect((err) => {
    if (err) {
        console.log('----皮卡資料連接異常----');
        console.error('Error connecting to the database: ' + err.stack);
        console.error('異常內容: ' + err.sqlMessage);
        console.log('----皮卡資料連接異常----');
        return;
    }else{
        console.log('----皮卡資料連接正常----');
        console.log('Connected as id ' + connection.threadId);

    }
    
});
module.exports = connection; // 確保這裡導出的是 connection