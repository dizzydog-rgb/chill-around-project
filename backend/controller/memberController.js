const axios = require('axios');
const memberModel = require("../models/memberModel");
require('dotenv').config();
const qs = require('qs');

// 會員登入控制器
exports.login = async (req, res) => {
    try {
        const result = await memberModel.loginEmail(req.body);
        if (result.token) {
            res.json({
                token: result.token,
                account: result.account,
                emailid: result.emailid
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
                account: result.account,
                emailid: result.emailid
            });
        } else {
            res.status(401).json({ message: result.error });
        }
    } catch (error) {
        console.error("註冊錯誤:", error);
        res.status(500).json({ message: "註冊錯誤" });
    }
};

// Google登入控制器
exports.Googlelogin = async (req, res) => {
    try {
        const result = await memberModel.GoogleloginData(req.body);
        if (result.token) {
            res.json({
                token: result.token,
                emailid: result.emailid,
                message: result.message
            });
        } else if (result.error == "註冊失敗") {
            res.status(400).json({ message: result.error });
        } else {
            res.status(401).json({ message: result.error });
        }

    } catch (error) {
        console.error("登入錯誤:", error);
        res.status(500).json({ message: "登入錯誤" });
    }
};

// Google註冊控制器
exports.Googleregister = async (req, res) => {
    try {
        const result = await memberModel.GoogleregData(req.body);
        if (result.token) {
            res.json({
                token: result.token,
                emailid: result.emailid,
                message: result.message
            });
        } else if (result.error) {
            res.status(400).json({ message: result.error });
        }

    } catch (error) {
        console.error("註冊錯誤:", error);
        res.status(500).json({ message: "註冊錯誤" });
    }
};

// Google綁定控制器
exports.GoogleBind = async (req, res) => {
    try {
        if (!req.currentUser || !req.currentUser.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const emailid = req.currentUser.id;
        const Googledata = req.body;

        const result = await memberModel.GoogleBindData({ emailid, Googledata });
        if (result.error) {
            return res.status(400).json({ message: result.error }); // 返回錯誤消息
        }
        if (result.success) {
            res.json({ message: "Google綁定成功!" });
        }
    } catch (error) {
        console.error("綁定錯誤:", error);
        res.status(500).json({ message: "綁定錯誤" });
    }
};

// Google解除綁定的控制器
exports.delGoogleid = async (req, res) => {
    try {
        if (!req.currentUser || !req.currentUser.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const emailid = req.currentUser.id;
        const result = await memberModel.updateGoogleid(emailid);
        if (result.error) {
            return res.status(400).json({ message: result.error }); // 返回錯誤消息
        }
        if (result.success) {
            res.json({ message: "解除綁定成功!" });
        }
    } catch (error) {
        // 錯誤處理
        console.error("Error fetching site:", error);
        res.status(500).json({ message: "解除綁定失敗" });
    }
};

// Line登入控制器
exports.Linelogin = async (req, res) => {
    try {
        const { code } = req.body;

        // Step 1: 取得 access token
        const tokenResponse = await axios.post("https://api.line.me/oauth2/v2.1/token",
            qs.stringify({
                grant_type: "authorization_code",
                code,
                redirect_uri: "http://localhost:5173/chill-around-project/pages/index.html",
                client_id: process.env.LINE_CLIENT_ID,
                client_secret: process.env.LINE_CLIENT_SECRET
            }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).catch(error => {
            console.error("Token request error:", error.response ? error.response.data : error.message);
            throw new Error("無法從 Line 取得 access token");
        });

        const accessToken = tokenResponse.data.access_token;
        const idToken = tokenResponse.data.id_token;

        // Step 2: 使用 access token 取得用戶資料
        const profileResponse = await axios.get("https://api.line.me/v2/profile", {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).catch(error => {
            console.error("無法取得用戶id和名稱:", error);
        });

        const userId = profileResponse.data.userId;
        const displayName = profileResponse.data.displayName;

        // 使用 id token 取得用戶email資料
        const verifyResponse = await axios.post("https://api.line.me/oauth2/v2.1/verify",
            qs.stringify({
                client_id: process.env.LINE_CLIENT_ID,
                id_token: idToken
            })
        ).catch(error => {
            console.error("無法取得用戶email:", error);
        });

        const email = verifyResponse.data.email;

        // Step 3: 查詢用戶資料庫以確認是否存在
        const result = await memberModel.LineData({ userId, displayName, email });

        // Step 4: 傳回 JWT
        if (result.token) {
            res.json({
                token: result.token,
                emailid: result.emailid,
                message: result.message
            });
        } else if (result.error == "註冊失敗") {
            res.status(400).json({ message: result.error });
        } else {
            res.status(401).json({ message: result.error });
        }
    } catch (error) {
        console.error("登入錯誤:", error);
        res.status(500).json({ message: "登入錯誤" });
    }
};

// Line註冊控制器
exports.Lineregister = async (req, res) => {
    try {
        const { code } = req.body;

        // Step 1: 取得 access token
        const tokenResponse = await axios.post("https://api.line.me/oauth2/v2.1/token",
            qs.stringify({
                grant_type: "authorization_code",
                code,
                redirect_uri: "http://localhost:5173/chill-around-project/pages/register.html",
                client_id: process.env.LINE_CLIENT_ID,
                client_secret: process.env.LINE_CLIENT_SECRET
            }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).catch(error => {
            console.error("Token request error:", error.response ? error.response.data : error.message);
            throw new Error("無法從 Line 取得 access token");
        });

        const accessToken = tokenResponse.data.access_token;
        const idToken = tokenResponse.data.id_token;

        // Step 2: 使用 access token 取得用戶資料
        const profileResponse = await axios.get("https://api.line.me/v2/profile", {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).catch(error => {
            console.error("無法取得用戶id和名稱:", error);
        });

        const userId = profileResponse.data.userId;
        const displayName = profileResponse.data.displayName;

        // 使用 id token 取得用戶email資料
        const verifyResponse = await axios.post("https://api.line.me/oauth2/v2.1/verify",
            qs.stringify({
                client_id: process.env.LINE_CLIENT_ID,
                id_token: idToken
            })
        ).catch(error => {
            console.error("無法取得用戶email:", error);
        });

        const email = verifyResponse.data.email;

        // Step 3: 查詢用戶資料庫以確認是否存在
        const result = await memberModel.LineregData({ userId, displayName, email });

        // Step 4: 傳回 JWT
        if (result.token) {
            res.json({
                token: result.token,
                emailid: result.emailid
            });
        } else if (result.error) {
            res.status(400).json({ message: result.error });
        }
    } catch (error) {
        console.error("註冊錯誤:", error);
        res.status(500).json({ message: "註冊錯誤" });
    }
};

// Line綁定控制器
exports.LineBind = async (req, res) => {
    try {
        if (!req.currentUser || !req.currentUser.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const emailid = req.currentUser.id;
        const { code } = req.body;

        const tokenResponse = await axios.post("https://api.line.me/oauth2/v2.1/token",
            qs.stringify({
                grant_type: "authorization_code",
                code,
                redirect_uri: "http://localhost:5173/chill-around-project/pages/member_personaldata.html",
                client_id: process.env.LINE_CLIENT_ID,
                client_secret: process.env.LINE_CLIENT_SECRET
            }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).catch(error => {
            console.error("Token request error:", error.response ? error.response.data : error.message);
            throw new Error("無法從 Line 取得 access token");
        });

        const accessToken = tokenResponse.data.access_token;

        const profileResponse = await axios.get("https://api.line.me/v2/profile", {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).catch(error => {
            console.error("無法取得用戶id和名稱:", error);
        });

        const userId = profileResponse.data.userId;

        const result = await memberModel.Lineupdate({ userId, emailid });
        if (result.error) {
            return res.status(400).json({ message: result.error }); // 返回錯誤消息
        }
        if (result.success) {
            res.json({ message: "Line綁定成功!" });
        }
    } catch (error) {
        console.error("綁定錯誤:", error);
        res.status(500).json({ message: "綁定錯誤" });
    }
};

// Line解除綁定的控制器
exports.delLineid = async (req, res) => {
    try {
        if (!req.currentUser || !req.currentUser.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const emailid = req.currentUser.id;
        const result = await memberModel.updateLineid(emailid);
        if (result.error) {
            return res.status(400).json({ message: result.error }); // 返回錯誤消息
        }
        if (result.success) {
            res.json({ message: "解除綁定成功!" });
        }
    } catch (error) {
        // 錯誤處理
        console.error("Error fetching site:", error);
        res.status(500).json({ message: "解除綁定失敗" });
    }
};

// 獲取會員資料控制器
exports.getByemail = async (req, res) => {
    try {
        // 沒接收到前用戶的 emailid
        if (!req.currentUser || !req.currentUser.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
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
        // 沒接收到前用戶的 emailid
        if (!req.currentUser || !req.currentUser.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
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
            return res.status(404).json({ message: "更新失敗。" });
        }
        res.json({ message: "會員資料更新成功!" }); // 返回更新後的用戶資料
    } catch (error) {
        console.error("更新錯誤:", error);
        res.status(500).json({ message: "更新錯誤" });
    }
};

// 獲取使用者所有旅行計畫資料的控制器
exports.getuserSchedule = async (req, res) => {
    try {
        // 沒接收到前用戶的 emailid
        if (!req.currentUser || !req.currentUser.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const emailid = req.currentUser.id; // 獲取當前用戶的 emailid
        let page = parseInt(req.params.page) || 1;
        //把<=0的page強制改成1
        if (page <= 0) {
            page = 1;
        }
        //每頁資料數
        var nums_per_page = 5;
        //定義資料偏移量
        var offset = (page - 1) * nums_per_page;

        const data = {
            emailid,
            page,
            nums_per_page,
            offset
        };

        // 從資料庫取得會員的行程資料
        const memberschedule = await memberModel.findUesrSchedule(data);
        // 如果找不到資料，回傳 404
        if (!memberschedule || memberschedule.length === 0) {
            return res.status(404).json({ message: "schedule not found" });
        }
        // 成功取得資料後回傳 JSON 給前端
        res.json({
            data: memberschedule.data, // 行程資料
            page: memberschedule.page, //頁碼數
            lastPage: memberschedule.lastPage // 最後一頁
        });
    } catch (error) {
        // 錯誤處理
        console.error("Error fetching site:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// 獲取使用者收藏的旅行計畫資料的控制器
exports.getLikeSch = async (req, res) => {
    try {
        // 沒接收到前用戶的 emailid
        if (!req.currentUser || !req.currentUser.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const emailid = req.currentUser.id; // 獲取當前用戶的 emailid
        let page = parseInt(req.params.page) || 1;
        //把<=0的page強制改成1
        if (page <= 0) {
            page = 1;
        }
        //每頁資料數
        var nums_per_page = 5;
        //定義資料偏移量
        var offset = (page - 1) * nums_per_page;

        const data = {
            emailid,
            page,
            nums_per_page,
            offset
        };

        // 從資料庫取得會員的行程資料
        const memberschedule = await memberModel.findLikeSch(data);
        // 如果找不到資料，回傳 404
        if (!memberschedule || memberschedule.length === 0) {
            return res.status(404).json({ message: "schedule not found" });
        }
        // 成功取得資料後回傳 JSON 給前端
        res.json({
            data: memberschedule.data, // 行程資料
            page: memberschedule.page, //頁碼數
            lastPage: memberschedule.lastPage // 最後一頁
        });
    } catch (error) {
        // 錯誤處理
        console.error("Error fetching site:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// 刪除使用者旅行計畫資料的控制器
exports.deluserSchByIds = async (req, res) => {
    try {
        // 將 `ids` 字串轉為陣列
        const scheduleIds = req.params.ids.split(',').map(id => parseInt(id, 10));
        // 從資料庫刪除特定ID的行程資料
        const result = await memberModel.dropScheduleByIds(scheduleIds);

        // 成功刪除後回傳 JSON 給前端
        res.json({ message: "刪除成功", affectedRows: result.affectedRows });
    } catch (error) {
        // 錯誤處理
        console.error("Error fetching site:", error);
        res.status(500).json({ message: "刪除失敗" });
    }
};

// 刪除使用者收藏行程的控制器
exports.delmyLikeSchByIds = async (req, res) => {
    try {
        // 將 `ids` 字串轉為陣列
        const scheduleIds = req.params.ids.split(',').map(id => parseInt(id, 10));
        // 從資料庫刪除特定ID的行程資料
        const result = await memberModel.dropmyLikeSchByIds(scheduleIds);

        // 成功刪除後回傳 JSON 給前端
        res.json({ message: "刪除成功", affectedRows: result.affectedRows });
    } catch (error) {
        // 錯誤處理
        console.error("Error fetching site:", error);
        res.status(500).json({ message: "刪除失敗" });
    }
};