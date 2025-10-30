import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { HealthAssessment } from './components/HealthAssessment';
import { Results } from './components/Results';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { AboutUs } from './components/AboutUs';
import { Contact } from './components/Contact';
import { NutritionistDirectory } from './components/NutritionistDirectory';
import { ChatInterface } from './components/ChatInterface';
import { ProgressReports } from './components/ProgressReports';
import AdminPanel from './components/AdminPanel';

export type HealthData = {
  age: number;
  gender: 'male' | 'female';
  bloodPressure: { systolic: number; diastolic: number };
  cholesterol: number;
  bmi: number;
  diabetes: boolean;
  familyHistory: boolean;
  smoking: 'never' | 'former' | 'current';
  lifestyle: 'sedentary' | 'moderate' | 'active';
  allergies: string;
  foodRestrictions: string;
};

export type RiskLevel = 'Low' | 'Medium' | 'High';

export type User = {
  id: string;
  name: string;
  email: string;
  isPremium?: boolean;
  userType: 'user' | 'doctor';
};

export type Nutritionist = {
  id: string;
  name: string;
  email: string;
  specialization: string[];
  experience: number;
  rating: number;
  totalConsultations: number;
  isVerified: boolean;
  isOnline: boolean;
  bio: string;
  qualifications: string[];
  hourlyRate: number;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
};

export type ChatSession = {
  id: string;
  userId: string;
  nutritionistId?: string;
  type: 'ai' | 'nutritionist';
  status: 'active' | 'ended';
  startTime: string;
  messages: ChatMessage[];
};

export type AssessmentResult = {
  id: string;
  riskLevel: RiskLevel;
  riskScore: number;
  date: string;
  healthData: HealthData;
  dietPlan: string[];
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'assessment' | 'results' | 'login' | 'register' | 'dashboard' | 'about' | 'contact' | 'nutritionists' | 'chat' | 'reports' | 'admin'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [userResults, setUserResults] = useState<AssessmentResult[]>([]);
  const [activeChat, setActiveChat] = useState<ChatSession | null>(null);
  const [selectedNutritionist, setSelectedNutritionist] = useState<Nutritionist | null>(null);

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setCurrentResult(result);
    if (user) {
      setUserResults(prev => [...prev, result]);
    }
    setCurrentPage('results');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    // Route based on user type
    if (userData.userType === 'doctor') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const handleSelectNutritionist = (nutritionist: Nutritionist) => {
    setSelectedNutritionist(nutritionist);
    // Create a new chat session
    const chatSession: ChatSession = {
      id: `chat-${Date.now()}`,
      userId: user?.id || '',
      nutritionistId: nutritionist.id,
      type: 'nutritionist',
      status: 'active',
      startTime: new Date().toISOString(),
      messages: []
    };
    setActiveChat(chatSession);
    setCurrentPage('chat');
  };

  const handleUpgradeToPremium = () => {
    // In a real app, this would integrate with payment processing
    if (user) {
      setUser({ ...user, isPremium: true });
    }
  };

  const handleEndChat = () => {
    setActiveChat(null);
    setSelectedNutritionist(null);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'landing' && (
          <LandingPage onGetStarted={() => setCurrentPage('assessment')} />
        )}
        
        {currentPage === 'assessment' && (
          <HealthAssessment onComplete={handleAssessmentComplete} />
        )}
        
        {currentPage === 'results' && currentResult && (
          <Results 
            result={currentResult}
            onNewAssessment={() => setCurrentPage('assessment')}
          />
        )}
        
        {currentPage === 'login' && (
          <Login 
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentPage('register')}
          />
        )}
        
        {currentPage === 'register' && (
          <Register 
            onRegister={handleLogin}
            onSwitchToLogin={() => setCurrentPage('login')}
          />
        )}
        
        {currentPage === 'dashboard' && user && (
          <Dashboard 
            user={user}
            results={userResults}
            onNewAssessment={() => setCurrentPage('assessment')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}
        
        {currentPage === 'about' && (
          <AboutUs />
        )}
        
        {currentPage === 'contact' && (
          <Contact />
        )}

        {currentPage === 'nutritionists' && (
          <NutritionistDirectory 
            user={user}
            onSelectNutritionist={handleSelectNutritionist}
            onUpgradeToPremium={handleUpgradeToPremium}
          />
        )}

        {currentPage === 'chat' && activeChat && (
          <ChatInterface 
            user={user}
            session={activeChat}
            nutritionist={selectedNutritionist}
            onEndChat={handleEndChat}
          />
        )}

        {currentPage === 'reports' && user && (
          <ProgressReports 
            user={user}
            assessmentResults={userResults}
          />
        )}

        {currentPage === 'admin' && user && (
          <AdminPanel />
        )}
      </main>
    </div>
  );
}