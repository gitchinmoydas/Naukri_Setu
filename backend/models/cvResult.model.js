const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  link: String,
  description: String,
  fullDescription: String,
  matchScore: String,
});

const cvResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cvData: {
    skills: [String],
    projects: [mongoose.Schema.Types.Mixed],
    experience: String,
    education: String,
  },
  usedSkills: [String],
  filters: {
    country: String,
    location: String,
    experience: String,
  },
  matchedJobs: [jobSchema],
}, { timestamps: true });

module.exports = mongoose.model("CVResult", cvResultSchema);