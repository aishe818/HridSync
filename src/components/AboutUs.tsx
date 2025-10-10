import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, Brain, Shield, Users, Target, BookOpen } from 'lucide-react';

export function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Heart className="w-8 h-8 text-primary" />
          <h1 className="text-3xl">About HridSync</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          An AI-powered heart disease risk assessment platform designed for educational purposes 
          as part of a university research project.
        </p>
        <Badge variant="secondary" className="mt-4">
          University Research Project
        </Badge>
      </div>

      {/* Project Purpose */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Project Purpose</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            HridSync was developed as part of a university project to demonstrate the application 
            of artificial intelligence in healthcare risk assessment. Our goal is to showcase how 
            machine learning algorithms can analyze multiple health factors to provide preliminary 
            heart disease risk evaluations.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4>Educational</h4>
              <p className="text-sm text-muted-foreground">
                Learn about AI in healthcare
              </p>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4>Research</h4>
              <p className="text-sm text-muted-foreground">
                Explore ML applications
              </p>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4>Demonstration</h4>
              <p className="text-sm text-muted-foreground">
                Showcase AI capabilities
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span>How Our AI Model Works</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Our AI model analyzes multiple health factors using a risk assessment algorithm 
            based on established medical research and guidelines. The system processes the 
            following data points:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="mb-3">Health Metrics</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Age and gender demographics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Blood pressure readings</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Cholesterol levels</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>BMI calculations</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3">Lifestyle Factors</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Diabetes status</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Family history</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Smoking habits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Physical activity levels</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-secondary/30 p-4 rounded-lg mt-6">
            <h4 className="mb-2">Risk Classification Process</h4>
            <p className="text-sm">
              The algorithm assigns weighted scores to each factor based on medical literature, 
              then calculates an overall risk score. This score is categorized into Low, Medium, 
              or High risk levels, with personalized diet recommendations generated based on the 
              assessment results and dietary restrictions.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Educational Disclaimers */}
      <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-amber-800 dark:text-amber-200">
            <Shield className="w-5 h-5" />
            <span>Educational Purpose & Limitations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-amber-800 dark:text-amber-200">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Educational Use Only</p>
                <p className="text-sm opacity-90">
                  This system is designed for educational purposes and academic demonstration. 
                  It is not intended for actual medical diagnosis or treatment decisions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Not a Medical Substitute</p>
                <p className="text-sm opacity-90">
                  HridSync does not replace professional medical advice, diagnosis, or treatment. 
                  Always consult with qualified healthcare professionals for medical concerns.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Simplified Model</p>
                <p className="text-sm opacity-90">
                  The AI model used is a simplified version for demonstration purposes and may 
                  not account for all medical complexities present in real clinical assessments.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">No Liability</p>
                <p className="text-sm opacity-90">
                  The developers and institution assume no responsibility for any decisions 
                  made based on the results provided by this educational platform.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Technology & Development</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            HridSync is built using modern web technologies to demonstrate responsive design 
            and user experience principles in healthcare applications.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Tailwind CSS</Badge>
            <Badge variant="outline">AI/ML Algorithms</Badge>
            <Badge variant="outline">Responsive Design</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-muted-foreground py-8">
        <p className="text-sm">
          Developed as part of a university research project • For educational purposes only
        </p>
      </div>
    </div>
  );
}