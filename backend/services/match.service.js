const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();

const matchJobs = (cvSkills, jobs) => {
  return jobs.map(job => {
    let matchCount = 0;

    const jobText = normalize(job.fullDescription || job.description || job.title || "");

    cvSkills.forEach(skill => {
      // Normalize skill but keep spaces for multi-word skills
      const normalizedSkill = normalize(skill);
      if (normalizedSkill.length < 2) return;

      if (jobText.includes(normalizedSkill)) {
        matchCount++;
      }
    });

    const score = cvSkills.length > 0 ? (matchCount / cvSkills.length) * 100 : 0;

    return {
      ...job,
      matchScore: score.toFixed(2) + "%"
    };
  })
  .filter(job => parseFloat(job.matchScore) > 0)
  .sort((a, b) => parseFloat(b.matchScore) - parseFloat(a.matchScore));
};

module.exports = { matchJobs };