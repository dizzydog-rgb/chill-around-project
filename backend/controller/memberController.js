const memberModel = require("../models/memberModel");

exports.getemailById = async (req, res) => {
    try {
        const emailId = req.params.id;
        const user = await memberModel.findEmailById(emailId);
        if (!user) {
            return res.status(404).json({ message: "未找到該會員。" });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error("Error fetching site:", error);
        res.status(500).json({ message: "Server Error" });
    }
};