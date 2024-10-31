const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();

// 在你的 Express 應用中
app.use(cors());

// 載入路由區
const indexRoutes = require("./routes/indexRoutes"); // 引入首頁相關路由
const buildPlanRoutes = require("./routes/buildPlanRoutes"); // 引入建立計畫相關路由
const schInfoRoutes = require("./routes/schInfoRoutes");//引入行程資訊相關路由

const siteRoutes = require("./routes/siteRoutes"); // 引入景點資訊相關路由
const BudgetRoutes = require("./routes/budgetRoutes"); // 引入預算相關路由
const itemRoutes = require("./routes/itemRoutes"); // 引入物品列表相關路由
const memberRoutes = require("./routes/memberRoutes"); // 引入註冊、會員中心路由
const testRoutes = require("./routes/testRoutes"); // 引入小測驗路由

app.use(express.json());

const path = require("path");
// 設置靜態資源目錄，並加上路徑前綴 '/chill-around-project'
const distPath = path.join(__dirname, "../", "dist");
app.use("/chill-around-project", express.static(distPath));

// 使用路由區
app.use("/", indexRoutes);
app.use("/buildPlan", buildPlanRoutes);
app.use("/schInfo", schInfoRoutes);
app.use("/member", memberRoutes);
app.use("/site", siteRoutes);
app.use("/budget", BudgetRoutes);
app.use("/item", itemRoutes);
app.use("/test", testRoutes);

// 注意，埠號是 8080
const port = 8080;
app.listen(port, () => {
  console.log(`超絕讚啟動中 on port ${port}`);
});
