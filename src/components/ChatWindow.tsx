import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { X } from 'lucide-react';

interface ChatWindowProps {
  sessionId: string;
  patient: { id: string; name: string; email: string };
  doctor: { id: string; name: string; email: string };
  onClose: () => void;
}

interface Message {
  sender: string;
  text: string;
  createdAt?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ sessionId, patient, doctor, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch(`/api/chat/${sessionId}/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data.messages));
  }, [sessionId]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    await fetch(`/api/chat/${sessionId}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: doctor.name, text: input }),
    });
    setMessages([...messages, { sender: doctor.name, text: input }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg shadow-lg relative">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            Chat with {patient.name}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            {/* Placeholder for chat messages */}
            Chat session #{sessionId} between Dr. {doctor.name} and {patient.name}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatWindow;