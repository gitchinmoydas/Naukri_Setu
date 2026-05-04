const fs = require("fs");
const pdfParse = require("pdf-parse/lib/pdf-parse");

const { extractCVData } = require("../services/cv.service");
const { scrapeJobs } = require("../services/job.service");
const { matchJobs } = require("../services/match.service");
const CVResult = require("../models/cvResult.model");

const SKIP_SKILLS = ["C/C++", "HTML/CSS", "Git/GitHub", "VS Code", "Postman"];

exports.parseCV = async (req, res) => {
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    const text = data.text;

    // Cleanup uploaded file
    fs.unlinkSync(filePath);

    const country = req.body.country || "IN";
    const location = req.body.location || "";
    const experience = req.body.experience || "fresher";

    const cvData = await extractCVData(text);

    const allSkills = Array.isArray(cvData.skills) ? cvData.skills : [];
    const finalSkills = allSkills
      .filter(skill => !SKIP_SKILLS.includes(skill))
      .slice(0, 7);

    if (finalSkills.length === 0)
      return res.status(400).json({ error: "No skills found in CV" });

    const top3Skills = finalSkills.slice(0, 3);
    const jobResults = await Promise.all(
      top3Skills.map(skill => scrapeJobs(skill, country, location, experience))
    );

    const seenLinks = new Set();
    const jobs = jobResults.flat().filter(job => {
      if (seenLinks.has(job.link)) return false;
      seenLinks.add(job.link);
      return true;
    });

    const matchedJobs = matchJobs(finalSkills, jobs);

    // ✅ Save to MongoDB
    await CVResult.create({
      user: req.user.id,
      cvData,
      usedSkills: finalSkills,
      filters: { country, location, experience },
      matchedJobs,
    });

    res.json({ cvData, usedSkills: finalSkills, country, location, experience, matchedJobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all past CV results for logged-in user
exports.getHistory = async (req, res) => {
  try {
    const results = await CVResult.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};