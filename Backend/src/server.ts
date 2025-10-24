import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 5002; // Make sure this is 5002

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
