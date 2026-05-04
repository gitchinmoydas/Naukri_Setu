const express = require("express");
const multer = require("multer");
const { parseCV, getHistory } = require("../controllers/cv.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", protect, upload.single("cv"), parseCV);
router.get("/history", protect, getHistory);

module.exports = router;