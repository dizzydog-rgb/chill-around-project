const express = require("express");
const app = express();

// 載入路由區
const indexRoutes = require("./routes/indexRoutes"); // 引入首頁相關路由
const buildPlanRoutes = require("./routes/buildPlanRoutes"); // 引入建立計畫相關路由
const PopupBudgetRoutes = require("./routes/PopupBudgetRoutes"); // 引入預算彈出視窗相關路由

app.use(express.json());

const path = require("path");
// 設置靜態資源目錄，並加上路徑前綴 '/chill-around-project'
const distPath = path.join(__dirname, "../", "dist");
app.use("/chill-around-project", express.static(distPath));

// 使用路由區
app.use("/", indexRoutes);
app.use("/buildPlan", buildPlanRoutes);
app.use("/Budget", PopupBudgetRoutes);

// 注意，埠號是 8080
const port = 8080;
app.listen(port, () => {
  console.log(`超絕讚啟動中 on port ${port}`);
});