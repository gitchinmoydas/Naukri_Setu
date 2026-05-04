const express = require("express");
const { getJobs } = require("../controllers/job.controller");

const router = express.Router();

router.get("/", getJobs);

module.exports = router;