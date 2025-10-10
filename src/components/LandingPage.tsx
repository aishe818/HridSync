import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Heart, Shield, Users, Utensils } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="flex justify-center">
          <Heart className="h-20 w-20 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold">
          Predict Your Heart Disease Risk
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get personalized insights about your cardiovascular health using advanced AI analysis. 
          Receive risk assessment and tailored diet recommendations with HridSync.
        </p>
        <Button size="lg" onClick={onGetStarted} className="text-lg px-8 py-3">
          Take Assessment Now
        </Button>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <Shield className="h-12 w-12 text-primary mx-auto" />
            <h3>AI-Powered Analysis</h3>
            <p className="text-muted-foreground">
              Advanced machine learning algorithms analyze your health data to provide accurate risk predictions.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <Utensils className="h-12 w-12 text-primary mx-auto" />
            <h3>Personalized Diet Plans</h3>
            <p className="text-muted-foreground">
              Get customized dietary recommendations based on your specific risk level and health profile.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <Users className="h-12 w-12 text-primary mx-auto" />
            <h3>Track Your Progress</h3>
            <p className="text-muted-foreground">
              Monitor your health journey with detailed assessments and track improvements over time.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              1
            </div>
            <h4>Enter Your Health Data</h4>
            <p className="text-muted-foreground text-sm">
              Provide information about your age, lifestyle, medical history, and vital signs.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              2
            </div>
            <h4>AI Analysis</h4>
            <p className="text-muted-foreground text-sm">
              Our AI model processes your data and calculates your personalized risk score.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              3
            </div>
            <h4>Get Risk Assessment</h4>
            <p className="text-muted-foreground text-sm">
              Receive your risk classification: Low, Medium, or High with detailed explanations.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              4
            </div>
            <h4>Diet Recommendations</h4>
            <p className="text-muted-foreground text-sm">
              Get personalized dietary guidelines to help manage and improve your heart health.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}