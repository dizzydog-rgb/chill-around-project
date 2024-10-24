const memberModel = require("../models/memberModel");

exports.login = async (req, res) => {
    try {
        const result = await memberModel.loginEmail(req.body);
        if (result.token) {
            res.json({
                token: result.token,
                account: result.account
            });
        } else {
            res.status(401).json({ message: result.error });
        }
    } catch (error) {
        console.error("登入錯誤:", error);
        res.status(500).json({ message: "登入錯誤" });
    }
};

exports.registermember = async (req, res) => {
    try {
        const result = await memberModel.registerData(req.body);
        if (result.error) {
            return res.status(400).json({ message: result.error }); // 返回錯誤消息
        }
        if (result.token) {
            res.json({
                token: result.token,
                account: result.account
            });
        } else {
            res.status(401).json({ message: result.error });
        }
    } catch (error) {
        console.error("註冊錯誤:", error);
        res.status(500).json({ message: "註冊錯誤" });
    }
};

exports.getByemail = async (req, res) => {
    try {
        const email = req.currentUser.email;
        const user = await memberModel.findEmail(email);
        if (!user) {
            return res.status(404).json({ message: "未找到該會員。" });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error("會員資料錯誤:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.updatemember = async (req, res) => {
    try {
        const emailid = req.currentUser.id; // 獲取當前用戶的 emailid
        const userdata = {
            ...req.body,
            emailid,
            sex: req.body.sex[0],
            uphoto: req.file ? req.file.filename : undefined // 如果沒有上傳檔案，設置為 undefined
        }; // 將 emailid 添加到 userdata 中
        const result = await memberModel.updateData(userdata);

        if (result.error) {
            return res.status(400).json({ message: result.error }); // 返回錯誤消息
        }
        res.json({ message: "會員資料更新成功!" });
    } catch (error) {
        console.error("更新錯誤:", error);
        res.status(500).json({ message: "更新錯誤" });
    }
};

