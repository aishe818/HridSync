import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const OPENAI_KEY = process.env.OPENAI_API_KEY || '';
export const callLLM = async (prompt: string) => {
  if (!OPENAI_KEY) return `LLM not configured. Prompt: ${prompt.substring(0,200)}`;
  try {
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400
    }, { headers: { Authorization: `Bearer ${OPENAI_KEY}` } });
    return res.data.choices[0].message.content;
  } catch (err:any) {
    console.error('LLM error', err?.response?.data || err.message);
    throw new Error('LLM request failed');
  }
};
