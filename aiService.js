const axios = require("axios");
const { mockAnalyze } = require("./mockService");

async function analyzeMessage(message) {
  if (process.env.MODE === "mock") {
    return mockAnalyze(message);
  }

  const url = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;

  const response = await axios.post(
    url,
    {
      messages: [
        {
          role: "system",
          content: `You are a backend classifier.
Return STRICT JSON:
{
  "priority": "high|medium|low",
  "category": "complaint|question|spam|general",
  "summary": "short summary",
  "draft_reply": "professional response"
}`
        },
        { role: "user", content: message }
      ],
      max_tokens: Number(process.env.MAX_TOKENS),
      temperature: Number(process.env.TEMPERATURE)
    },
    {
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_API_KEY
      }
    }
  );

  return JSON.parse(response.data.choices[0].message.content);
}

module.exports = { analyzeMessage };
