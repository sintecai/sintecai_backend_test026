require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const { analyzeMessage } = require("./services/aiService");

app.post("/analyze", async (req, res) => {
  try {
    const result = await analyzeMessage(req.body.message);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Backend running on port ${process.env.PORT}`);
  console.log(`MODE = ${process.env.MODE}`);
});
