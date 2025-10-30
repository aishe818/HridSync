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

// Predict risk endpoint
app.post('/api/predict-risk', async (req, res) => {
  const data = req.body || {};
  if (!data || typeof data !== 'object') return res.status(400).json({ error: 'invalid input' });

  if (!openai) return res.status(503).json({ error: 'OpenAI API key not configured on server' });

  const systemPrompt = `You are a clinical decision support assistant. Given the user's clinical data in JSON, estimate the probability (0-1) that the user has or will develop significant heart disease within 10 years and return a strict JSON object with keys: riskScore (number between 0 and 1), riskLevel (Low|Medium|High) and explanation (short). Output only valid JSON.`;

  try {
    const userContent = JSON.stringify(data);
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent }
      ],
      temperature: 0.0,
      max_tokens: 300
    });

    const text = completion.choices?.[0]?.message?.content || '';
    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch (e) {
      // fallback simple heuristic
      const heuristicScore = (() => {
        let score = 0;
        const age = Number(data.age) || 0;
        if (age > 50) score += 0.2;
        const bp = data.bloodPressure?.systolic || 0;
        if (bp >= 140) score += 0.25;
        const chol = Number(data.cholesterol) || 0;
        if (chol > 200) score += 0.2;
        if (data.diabetes) score += 0.15;
        if (data.smoking === 'current') score += 0.15;
        return Math.min(1, score);
      })();

      const level = heuristicScore >= 0.6 ? 'High' : heuristicScore >= 0.3 ? 'Medium' : 'Low';
      return res.json({ riskScore: heuristicScore, riskLevel: level, explanation: 'Could not parse AI JSON; returned heuristic estimate.' });
    }
  } catch (err) {
    console.error('predict-risk error', err);
    return res.status(500).json({ error: 'prediction failed' });
  }
});

// Diet generator endpoint
app.post('/api/generate-diet', async (req, res) => {
  const data = req.body || {};
  if (!data || typeof data !== 'object') return res.status(400).json({ error: 'invalid input' });

  if (!openai) return res.status(503).json({ error: 'OpenAI API key not configured on server' });

  const systemPrompt = `You are a helpful registered dietitian. Given user preferences and goals as JSON, generate a heart-healthy 3-day meal plan tailored to preferences and allergies. Respond with a strict JSON object: { dailyMeals: [{day:string, meals:[{name:string, items:string[] , calories:number, swaps: {if_dislike: string, swap_with: string}[]}] }], shoppingList: string[] }. Output only JSON.`;

  try {
    const userContent = JSON.stringify(data);
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const text = completion.choices?.[0]?.message?.content || '';
    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch (e) {
      return res.status(500).json({ error: 'AI returned non-JSON output', raw: text });
    }
  } catch (err) {
    console.error('generate-diet error', err);
    return res.status(500).json({ error: 'diet generation failed' });
  }
});

// Recommendations endpoint
app.post('/api/recommendations', async (req, res) => {
  const data = req.body || {};
  if (!data || typeof data !== 'object') return res.status(400).json({ error: 'invalid input' });

  if (!openai) return res.status(503).json({ error: 'OpenAI API key not configured on server' });

  const systemPrompt = `You are a helpful assistant recommending nutritionists and follow-up targets for cardiovascular risk reduction. Given the user's summary in JSON and risk level, return JSON: { nutritionists: [{name, specialization, note}], suggestions: [{metric, target, interval_days}], explanation: string }`;

  try {
    const userContent = JSON.stringify(data);
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent }
      ],
      temperature: 0.6,
      max_tokens: 400
    });

    const text = completion.choices?.[0]?.message?.content || '';
    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch (e) {
      return res.status(500).json({ error: 'AI returned non-JSON output', raw: text });
    }
  } catch (err) {
    console.error('recommendations error', err);
    return res.status(500).json({ error: 'recommendations failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
