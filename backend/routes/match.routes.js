const express = require("express");
const { getMatchedJobs } = require("../controllers/match.controller");

const router = express.Router();

router.post("/", getMatchedJobs);

module.exports = router;