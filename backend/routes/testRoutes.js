const express = require("express");
const path = require("path");
const router = express.Router();
const testController = require("../controller/testController");


router.get("/", function (req, res) {
    // res.send("成功呼叫")  // localhost:8080/test
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
router.get("/:id", testController.getTestById);  // http://localhost:8080/test/1
module.exports = router;