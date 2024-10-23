const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: "未提供授權令牌" });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: "授權令牌格式不正確" });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.currentUser = decoded; // 將解碼後的使用者資訊附加到請求對像上
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "授權令牌已過期" });
        }
        res.status(401).json({ message: "無效的授權令牌" });
    }
};