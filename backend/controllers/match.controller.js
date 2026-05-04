const { scrapeJobs } = require("../services/job.service");
const { matchJobs } = require("../services/match.service");

exports.getMatchedJobs = async (req, res) => {
  try {
    const { skills, country, location, experience } = req.body;

    const jobResults = await Promise.all(
      skills.slice(0, 3).map(skill =>
        scrapeJobs(skill, country || "IN", location || "", experience || "fresher")
      )
    );

    const seenLinks = new Set();
    const jobs = jobResults.flat().filter(job => {
      if (seenLinks.has(job.link)) return false;
      seenLinks.add(job.link);
      return true;
    });

    const matchedJobs = matchJobs(skills, jobs);

    res.json(matchedJobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};