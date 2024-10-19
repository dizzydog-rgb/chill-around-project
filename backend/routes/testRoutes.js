const express = require("express");
const path = require("path");
const router = express.Router();


router.get("/test", function (req, res) {
    // res.send("成功呼叫")
  const options = {
    root: path.join(__dirname, "../../", "dist"),
  };
  const fileName = "test.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error("Error sending file:", err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});