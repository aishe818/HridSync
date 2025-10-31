import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import ChatSession from "./models/ChatSession";
import ChatMessage from "./models/ChatMessage";
import User from "./models/User";

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// helper: verify token -> returns userId and role
function verifyToken(token?: string) {
  if (!token) throw new Error("No token");
  const decoded = jwt.verify(token, JWT_SECRET) as any;
  return { id: decoded.id, role: decoded.role };
}

export default (io: Server) => {
  io.use((socket: Socket, next) => {
    // token can be passed in handshake auth: io({ auth: { token } })
    const token = socket.handshake.auth?.token as string | undefined;
    try {
      const user = verifyToken(token);
      socket.data.user = user; // attach to socket
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const user = socket.data.user;
    console.log(`Socket connected: ${socket.id} user=${user?.id}`);

    // join a chat session room
    socket.on("join_session", async (payload: { sessionId: string }) => {
      try {
        const { sessionId } = payload;
        const session = await ChatSession.findById(sessionId).populate("user nutritionist");
        if (!session) {
          socket.emit("error", "Session not found");
          return;
        }
        // verify the user is allowed: either the session user or the assigned nutritionist
        const allowed =
          session.user.toString() === user.id.toString() ||
          (session.nutritionist && session.nutritionist.toString() === user.id.toString());
        if (!allowed) {
          socket.emit("error", "Not authorized for this session");
          return;
        }
        socket.join(sessionId);
        // optionally emit history
        const history = await ChatMessage.find({ session: sessionId }).sort({ createdAt: 1 }).limit(200);
        socket.emit("session_history", history);
        // notify other participant(s)
        socket.to(sessionId).emit("participant_joined", { userId: user.id });
      } catch (err) {
        console.error(err);
        socket.emit("error", "Failed to join session");
      }
    });

    // incoming message from client
    socket.on("send_message", async (payload: { sessionId: string; text?: string; meta?: any }) => {
      try {
        const { sessionId, text, meta } = payload;
        if (!text && !meta) return;
        // ensure user in room
        const rooms = Array.from(socket.rooms);
        if (!rooms.includes(sessionId)) {
          socket.emit("error", "You must join session first");
          return;
        }
        // construct message
        const messageDoc = await ChatMessage.create({
          session: sessionId,
          sender: user.id,
          text: text || "",
          meta: meta || {},
          createdAt: new Date(),
        });
        // broadcast to room
        io.to(sessionId).emit("receive_message", messageDoc);
      } catch (err) {
        console.error("send_message error", err);
        socket.emit("error", "message send failed");
      }
    });

    // typing indicator
    socket.on("typing", (payload: { sessionId: string; typing: boolean }) => {
      socket.to(payload.sessionId).emit("typing", { userId: user.id, typing: payload.typing });
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
