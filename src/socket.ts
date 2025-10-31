import { io } from 'socket.io-client';

// Use the VITE_API_URL from your environment variables, or fallback to localhost
export const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5002');