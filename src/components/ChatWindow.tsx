import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatWindow = ({ sessionId, doctor }: any) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionId) return;

    socket.emit('joinRoom', sessionId);

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit('sendMessage', {
      sessionId,
      sender: 'nutritionist',
      text: input.trim(),
    });

    setInput('');
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto border p-3 rounded">
        {messages.map((m, i) => (
          <div key={i} className={`my-2 ${m.sender === 'nutritionist' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded ${m.sender === 'nutritionist' ? 'bg-green-200' : 'bg-gray-200'}`}>
              {m.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex mt-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a reply..."
          className="flex-1 border p-2 rounded"
        />
        <button onClick={sendMessage} className="ml-2 bg-green-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
