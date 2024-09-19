const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const port = 3000;

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    candidateCount: 1,
    stopSequences: ["x"],
    maxOutputTokens: 50,
    temperature: 1.0,
  },
});

let geminiResponse = "";

async function generateContent(userPrompt) {
  try {
    const result = await model.generateContent(
      // window.localStorage.getItem("user-prompt")
      userPrompt
    );
    // console.log(result.response.text());
    geminiResponse = result.response.text();
    console.log(geminiResponse);
    return geminiResponse;
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

app.get("/test", async (req, res) => {
  console.log("GET request successful");
  const userPrompt = req.query.prompt;
  console.log(userPrompt)
  const geminiResponse = await generateContent(userPrompt);
  res.json({ message: geminiResponse });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
