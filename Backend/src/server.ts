import http from "http";
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes';
import { Server as IOServer } from "socket.io";

const app = express();
const PORT = process.env.PORT || 5002; // Make sure this is 5002

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

(async () => {
  await connectDB();
  const httpServer = http.createServer(app);

  // create Socket.IO server with CORS allowed for your frontend
  const io = new IOServer(httpServer, {
    cors: { origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000" },
    pingTimeout: 30000,
  });

  // Attach io to app for access in controllers
  app.set('io', io);

  // Import/attach socket logic
  import("./socket").then(({ default: registerSocket }) => registerSocket(io));

  httpServer.listen(PORT, () => {
    console.log(`Server + Socket.IO running on http://localhost:${PORT}`);
  });
})();
