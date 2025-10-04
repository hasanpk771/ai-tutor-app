import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // ✅ React থেকে request allow করার জন্য

// OpenAI client setup
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// test route
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running!");
});

// example API route
app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ Error from OpenAI:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
