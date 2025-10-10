import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { MessageCircle, Send, Bot, User, Heart } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface HeartChatbotProps {
  riskLevel?: 'Low' | 'Medium' | 'High';
}

export function HeartChatbot({ riskLevel }: HeartChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hello! I'm your heart health assistant. I can help answer questions about cardiovascular health, diet, exercise, and lifestyle recommendations${riskLevel ? ` based on your ${riskLevel.toLowerCase()} risk assessment` : ''}. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const heartHealthResponses = {
    // Diet related
    diet: "A heart-healthy diet should include plenty of fruits and vegetables, whole grains, lean proteins, and healthy fats like those found in olive oil and nuts. Limit saturated fats, trans fats, cholesterol, sodium, and added sugars.",
    
    nutrition: "Focus on the Mediterranean or DASH diet patterns. Include omega-3 rich foods like salmon, walnuts, and flaxseeds. Aim for 5-9 servings of fruits and vegetables daily.",
    
    sodium: "Limit sodium to less than 2,300mg per day (ideally less than 1,500mg if you have high blood pressure). Read food labels and choose fresh, unprocessed foods when possible.",
    
    // Exercise related
    exercise: "Aim for at least 150 minutes of moderate-intensity aerobic exercise per week, or 75 minutes of vigorous exercise. Include muscle-strengthening activities at least 2 days per week.",
    
    cardio: "Cardiovascular exercises like walking, swimming, cycling, and dancing are excellent for heart health. Start slowly and gradually increase intensity and duration.",
    
    // Risk factors
    cholesterol: "To manage cholesterol: eat soluble fiber foods (oats, beans, apples), choose lean proteins, limit saturated fats, and maintain a healthy weight. Regular exercise also helps raise HDL (good) cholesterol.",
    
    "blood pressure": "To help manage blood pressure: reduce sodium intake, maintain a healthy weight, exercise regularly, limit alcohol, manage stress, and don't smoke. The DASH diet is particularly effective.",
    
    smoking: "Quitting smoking is one of the best things you can do for your heart. Within just one year of quitting, your risk of heart disease drops by about half.",
    
    stress: "Chronic stress can contribute to heart disease. Try stress-reduction techniques like deep breathing, meditation, yoga, regular exercise, or talking to a counselor.",
    
    // Lifestyle
    sleep: "Poor sleep quality is linked to heart disease. Aim for 7-9 hours of quality sleep per night. Maintain a consistent sleep schedule and create a relaxing bedtime routine.",
    
    alcohol: "If you drink alcohol, do so in moderation: up to one drink per day for women and up to two drinks per day for men. Excessive alcohol consumption can raise blood pressure.",
    
    // Symptoms
    symptoms: "Warning signs of heart problems include chest pain or discomfort, shortness of breath, pain in arms/back/neck/jaw, nausea, lightheadedness, or cold sweats. If you experience these symptoms, especially during physical activity, seek medical attention immediately.",
    
    // General
    prevention: "Heart disease prevention involves: eating a healthy diet, exercising regularly, not smoking, maintaining a healthy weight, managing stress, limiting alcohol, and getting regular checkups to monitor blood pressure, cholesterol, and diabetes.",
    
    checkup: "Regular checkups are important for monitoring blood pressure, cholesterol levels, blood sugar, and overall heart health. Follow your doctor's recommendations for screening frequency based on your risk factors."
  };

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check for specific keywords and return appropriate responses
    for (const [keyword, response] of Object.entries(heartHealthResponses)) {
      if (message.includes(keyword)) {
        return response;
      }
    }
    
    // Risk level specific responses
    if (riskLevel && (message.includes('risk') || message.includes('recommendation'))) {
      switch (riskLevel) {
        case 'Low':
          return "Based on your low risk assessment, continue your healthy habits! Focus on maintaining a balanced diet, regular exercise, and avoiding smoking. Keep up the great work!";
        case 'Medium':
          return "With your medium risk level, consider increasing physical activity to 150+ minutes per week, reducing sodium and saturated fat intake, and having regular checkups with your healthcare provider.";
        case 'High':
          return "Given your high risk assessment, it's important to work closely with your healthcare provider. Focus on strict dietary changes, supervised exercise, and closely monitoring your vital signs.";
      }
    }
    
    // Generic heart health response
    if (message.includes('heart') || message.includes('cardiac') || message.includes('cardiovascular')) {
      return "Heart health is influenced by many factors including diet, exercise, smoking, stress management, and genetics. The key is adopting a comprehensive approach with healthy lifestyle choices. Is there a specific aspect of heart health you'd like to know more about?";
    }
    
    // Default response
    return "I'm here to help with heart health questions! You can ask me about diet, exercise, risk factors, symptoms, or prevention strategies. What specific aspect of cardiovascular health interests you?";
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: generateResponse(inputValue),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Heart Health Assistant
          {riskLevel && (
            <Badge variant="secondary" className="ml-2">
              {riskLevel} Risk
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {formatTimestamp(message.timestamp)}
                  </p>
                </div>
                
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about heart health, diet, exercise..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
            />
            <Button 
              onClick={sendMessage} 
              disabled={!inputValue.trim() || isTyping}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This chatbot provides general information and should not replace professional medical advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}