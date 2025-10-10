import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Nutritionist, ChatSession, ChatMessage } from '../App';
import { 
  Send, 
  Bot, 
  User as UserIcon, 
  Phone, 
  Video, 
  MoreVertical,
  CheckCircle,
  Clock,
  ArrowLeft,
  Heart,
  Paperclip
} from 'lucide-react';

interface ChatInterfaceProps {
  user: User | null;
  session: ChatSession | null;
  nutritionist?: Nutritionist | null;
  onEndChat: () => void;
}

export function ChatInterface({ user, session, nutritionist, onEndChat }: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(session?.messages || []);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !user) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    if (session?.type === 'ai') {
      // Simulate AI response
      setIsTyping(true);
      
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: `ai-${Date.now()}`,
          senderId: 'ai',
          senderName: 'HridSync AI',
          message: generateAIResponse(newMessage.message),
          timestamp: new Date().toISOString(),
          type: 'text'
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 2000);
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      exercise: [
        "For heart health, I recommend starting with 30 minutes of moderate cardio like brisk walking 5 days a week. Swimming and cycling are also excellent low-impact options.",
        "Based on your profile, try incorporating strength training 2-3 times per week along with cardio. Start with light weights and focus on proper form.",
        "Yoga and stretching can help reduce stress, which is beneficial for heart health. Consider adding 10-15 minutes of daily meditation or deep breathing exercises."
      ],
      diet: [
        "Focus on the Mediterranean diet - rich in omega-3 fatty acids, whole grains, fruits, and vegetables. Limit processed foods and excess sodium.",
        "Try to include fatty fish like salmon or mackerel 2-3 times per week. These are excellent sources of heart-healthy omega-3s.",
        "For healthy snacks, consider nuts, berries, or Greek yogurt. Avoid sugary snacks and opt for whole foods when possible."
      ],
      nutrition: [
        "Based on your risk assessment, aim for foods rich in fiber, potassium, and antioxidants. Leafy greens, berries, and whole grains are excellent choices.",
        "Consider reducing sodium intake to less than 2300mg per day. Read food labels and choose fresh, unprocessed foods when possible.",
        "Stay hydrated with 8-10 glasses of water daily. Limit alcohol consumption and avoid sugary beverages."
      ],
      general: [
        "I'm here to help with heart-healthy nutrition and lifestyle advice. What specific area would you like to focus on - diet, exercise, or general wellness?",
        "Based on your health profile, I can provide personalized recommendations. Would you like suggestions for meal planning, exercise routines, or stress management?",
        "Feel free to ask about heart-healthy foods, exercise recommendations, or lifestyle changes that can improve your cardiovascular health."
      ]
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('fitness')) {
      return responses.exercise[Math.floor(Math.random() * responses.exercise.length)];
    } else if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('meal') || lowerMessage.includes('eat')) {
      return responses.diet[Math.floor(Math.random() * responses.diet.length)];
    } else if (lowerMessage.includes('nutrition') || lowerMessage.includes('vitamin') || lowerMessage.includes('supplement')) {
      return responses.nutrition[Math.floor(Math.random() * responses.nutrition.length)];
    } else {
      return responses.general[Math.floor(Math.random() * responses.general.length)];
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl mb-2">No Active Chat Session</h3>
            <p className="text-muted-foreground mb-4">
              Start a new conversation with our AI assistant or connect with a nutritionist.
            </p>
            <Button onClick={onEndChat}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      {/* Chat Header */}
      <Card className="rounded-b-none border-b-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onEndChat}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  {session.type === 'ai' ? (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {nutritionist?.name.split(' ').map(n => n[0]).join('') || 'N'}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    {session.type === 'ai' ? 'HridSync AI Assistant' : nutritionist?.name || 'Nutritionist'}
                    {session.type === 'nutritionist' && nutritionist?.isVerified && (
                      <CheckCircle className="w-4 h-4 text-primary" />
                    )}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {session.type === 'ai' ? (
                      <Badge variant="secondary" className="text-xs">
                        <Bot className="w-3 h-3 mr-1" />
                        AI Assistant
                      </Badge>
                    ) : (
                      <>
                        <div className={`w-2 h-2 rounded-full ${nutritionist?.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span>{nutritionist?.isOnline ? 'Online' : 'Offline'}</span>
                        {nutritionist?.specialization && (
                          <Badge variant="outline" className="text-xs">
                            {nutritionist.specialization[0]}
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {session.type === 'nutritionist' && (
                <>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                </>
              )}
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages Area */}
      <Card className="flex-1 rounded-none border-x border-y-0 overflow-hidden">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {session.type === 'ai' ? (
                    <Bot className="w-8 h-8 text-primary" />
                  ) : (
                    <Heart className="w-8 h-8 text-primary" />
                  )}
                </div>
                <h3 className="text-lg mb-2">
                  {session.type === 'ai' 
                    ? 'Welcome to HridSync AI Assistant!' 
                    : `Welcome to your consultation with ${nutritionist?.name}!`
                  }
                </h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  {session.type === 'ai'
                    ? 'I can help you with heart-healthy nutrition advice, exercise recommendations, and lifestyle tips. What would you like to know?'
                    : 'Your nutritionist is here to provide personalized guidance for your heart health journey.'
                  }
                </p>
              </div>
            )}
            
            {/* Chat Messages */}
            {messages.map((msg) => {
              const isUser = msg.senderId === user?.id;
              const isAI = msg.senderId === 'ai';
              
              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Avatar className="w-8 h-8">
                      {isUser ? (
                        <div className="w-full h-full bg-primary flex items-center justify-center">
                          <UserIcon className="w-4 h-4 text-white" />
                        </div>
                      ) : isAI ? (
                        <div className="w-full h-full bg-secondary flex items-center justify-center">
                          <Bot className="w-4 h-4 text-muted-foreground" />
                        </div>
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {msg.senderName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div className={`space-y-1 ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className={`px-4 py-2 rounded-lg max-w-md ${
                        isUser 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>{formatTime(msg.timestamp)}</span>
                        {isUser && <CheckCircle className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="w-8 h-8">
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <Bot className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </Avatar>
                  <div className="bg-secondary px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Message Input */}
      <Card className="rounded-t-none border-t-0">
        <CardContent className="p-4">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
            <Button type="button" variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
              disabled={isTyping}
            />
            <Button type="submit" disabled={!message.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
          
          {session.type === 'ai' && (
            <div className="mt-2 text-xs text-muted-foreground text-center">
              AI responses are for educational purposes only. Always consult healthcare professionals for medical advice.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}