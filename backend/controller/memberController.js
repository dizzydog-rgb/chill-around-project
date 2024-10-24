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
        res.status(500).json({ message: "Server Error" });
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
        console.error("錯誤:", error);
        res.status(500).json({ message: "Server Error" });
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
        console.error("登入錯誤:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.updatemember = async (req, res) => {
    try {
        const userdata = await memberModel.updateData(req.body);
        if (userdata.error) {
            return res.status(400).json({ message: result.error }); // 返回錯誤消息
        }
    } catch (error) {
        console.error("登入錯誤:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

