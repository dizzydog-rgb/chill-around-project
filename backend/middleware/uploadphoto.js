const multer = require('multer');
const path = require('path');

// 設置存儲位置和文件名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../assets/images/memberimg')); // 確保這個路徑存在
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // 使用當前時間戳作為文件名
    }
});

// 創建 multer 實例
const upload = multer({ storage: storage });

module.exports = upload;