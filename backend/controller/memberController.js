const memberModel = require("../models/memberModel");

// 會員登入控制器
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

// 傳送註冊資料控制器
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

// 獲取會員資料控制器
exports.getByemail = async (req, res) => {
    try {
        const emailid = req.currentUser.id;
        const user = await memberModel.findEmail(emailid);
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

// 更新會員資料控制器
exports.updatemember = async (req, res) => {
    try {
        const emailid = req.currentUser.id; // 獲取當前用戶的 emailid
        const userdata = {
            ...req.body,
            emailid,
            sex: req.body.sex[1],
            uphoto: req.file ? req.file.filename : undefined // 如果沒有上傳檔案，設置為 undefined
        }; // 將 emailid 添加到 userdata 中

        const result = await memberModel.updateData(userdata);
        if (result.error) {
            return res.status(400).json({ message: result.error }); // 返回錯誤消息
        }

        // 使用 emailid 查詢最新的用戶資料
        const updatedUser = await memberModel.findEmail(emailid);
        if (!updatedUser) {
            return res.status(404).json({ message: "未找到該會員。" });
        }
        res.json({ message: "會員資料更新成功!"}); // 返回更新後的用戶資料
    } catch (error) {
        console.error("更新錯誤:", error);
        res.status(500).json({ message: "更新錯誤" });
    }
};

// 獲取使用者所有旅行計畫資料的控制器
exports.getuserSchedule = async (req, res) => {
    try {
      // 從資料庫取得所有的行程資料
      const allschedule = await memberModel.findAllSchedule();
      // 如果找不到資料，回傳 404
      if (!allschedule || allschedule.length === 0) {
        return res.status(404).json({ message: "schedule not found" });
      }
      // 成功取得資料後回傳 JSON 給前端
      res.json(allschedule);
    } catch (error) {
      // 錯誤處理
      console.error("Error fetching site:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };