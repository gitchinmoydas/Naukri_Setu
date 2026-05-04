const axios = require("axios");

const EXPERIENCE_MAP = {
  fresher: "entry level fresher",
  junior: "junior",
  mid: "mid level",
  senior: "senior",
  lead: "lead principal",
};

const scrapeJobs = async (
  keyword = "react developer",
  country = "IN",
  location = "",
  experience = ""
) => {
  const expText = EXPERIENCE_MAP[experience] || "";

  const query = location
    ? `${expText} ${keyword} jobs in ${location}`.trim()
    : `${expText} ${keyword} jobs in ${country}`.trim();

  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query: query,
      page: "1",
      num_pages: "1",
      country: country,
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);
  const data = response.data.data;

  if (!data || data.length === 0) return [];

  return data.slice(0, 10).map((job) => ({
    title: job.job_title,
    company: job.employer_name,
    location: job.job_city || job.job_country,
    link: job.job_apply_link,
    description: job.job_description?.slice(0, 500) + "...",
    fullDescription: job.job_description || "",
  }));
};

module.exports = { scrapeJobs };