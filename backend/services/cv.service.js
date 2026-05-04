const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const extractCVData = async (cvText) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
  });

  const prompt = `
Extract structured data from this CV.

Return ONLY valid JSON:
{
  "skills": [],
  "projects": [],
  "experience": "",
  "education": ""
}

CV:
${cvText}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Clean JSON safely
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}") + 1;
  const cleanJSON = text.slice(jsonStart, jsonEnd);

  return JSON.parse(cleanJSON);
};

module.exports = { extractCVData };