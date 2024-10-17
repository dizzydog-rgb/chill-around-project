## 後端開發說明

以景點為例，當伺服器接受到請求時

1. Express 會根據路由（`siteRoutes.js`）來解析請求（例如，網址為，/sites/123）

```
// siteRoutes.js
const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");

// 定義 GET 請求的路由為 /sites/:id，來處理帶有景點 ID 的請求
router.get("/sites/:id", siteController.getSiteById);

module.exports = router;
```

2. ~~使用`authMiddleware.js`進行驗證(可以先跳過不做)~~
3. 調用控制器（`siteController.js`）的`getSiteById`  函數，`getSiteById`  會從  `req.params`  中提取  `id`（在此為  `123`）

```
// siteController.js
const siteModel = require("../models/siteModel");

// 獲取特定景點資料的控制器
exports.getSiteById = async (req, res) => {
  try {
    // 從 URL 參數中提取 ID
    const siteId = req.params.id;
    // 從資料庫取得特定 ID 的景點資料
    const site = await siteModel.findSiteById(siteId);
    // 如果找不到資料，回傳 404
    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }
    // 成功取得資料後回傳 JSON 給前端
    res.json(site);
  } catch (error) {
    // 錯誤處理
    console.error("Error fetching site:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
```

4. 控制器（`userController.js`）接續調用  `userModel.js`  中的  `findById(id)`  函數，並將這個  `id`  傳入，讓模型執行資料庫操作以查詢對應的使用者資料。

```
const db = require("../config/database");

// 獲取特定編號景點的模組函數
exports.findSiteById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM sites WHERE id = ?"; // 根據 sites 資料表的 id 欄位
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      // 如果查詢結果有資料，返回第一筆
      resolve(results[0]);
    });
  });
};
```

5. 控制器（`userController.js`）的`getUserById`  函數回傳資料查詢結果到客戶端
6. 前端使用 Axios 發送請求

```
import axios from 'axios';

axios.get('http://localhost:8080/sites/123')
  .then(response => {
    console.log('景點資料:', response.data);
    // 這裡可以進一步處理獲取的資料，例如更新 UI
  })
  .catch(error => {
    console.error('無法取得景點資料:', error);
  });
```
