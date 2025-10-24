// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config(); // Load .env variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Initialize OpenAI client if key is present
let openai = null;
if (OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: OPENAI_API_KEY });
} else {
  console.warn('OPENAI_API_KEY not set — AI chat endpoint will not be available');
}

// Check if MONGO_URL exists
if (!MONGO_URL) {
  console.error("Error: MONGO_URL is not defined in .env");
  process.exit(1); // Stop the server
}

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Stop the server on DB error
});

// Test route
app.get("/", (req, res) => {
  res.send("Heart Disease Risk Prediction App Backend is running!");
});

// Chat endpoint that proxies to OpenAI
app.post('/api/chat', async (req, res) => {
  const { message, riskLevel } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' });
  }

  if (!openai) {
    return res.status(503).json({ error: 'OpenAI API key not configured on server' });
  }

  const systemPrompt = `You are a helpful, empathetic heart health assistant. Provide evidence-based, non-diagnostic advice about diet, exercise, lifestyle and risk reduction. When relevant, tailor recommendations to the user's risk level: ${riskLevel || 'unknown'}. Always include a short reminder to consult a healthcare professional for personalized medical advice.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 600
    });

    const text = completion.choices?.[0]?.message?.content || '';
    return res.json({ reply: text });
  } catch (err) {
    console.error('OpenAI request error:', err);
    return res.status(500).json({ error: 'OpenAI request failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
