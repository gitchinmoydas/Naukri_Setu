const { scrapeJobs } = require("../services/job.service");

exports.getJobs = async (req, res) => {
  try {
    const { skill, country, location, experience } = req.query;

    const jobs = await scrapeJobs(
      skill || "mern developer",
      country || "IN",
      location || "",
      experience || "fresher"
    );

    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};