import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { AssessmentResult } from '../App';
import { Heart, TrendingUp, TrendingDown, Minus, CheckCircle2, Utensils } from 'lucide-react';
import { HeartChatbot } from './HeartChatbot';

interface ResultsProps {
  result: AssessmentResult;
  onNewAssessment: () => void;
}

export function Results({ result, onNewAssessment }: ResultsProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'bg-emerald-500';
      case 'Medium': return 'bg-amber-500';
      case 'High': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return <TrendingDown className="h-6 w-6 text-emerald-600" />;
      case 'Medium': return <Minus className="h-6 w-6 text-amber-600" />;
      case 'High': return <TrendingUp className="h-6 w-6 text-red-600" />;
      default: return <Heart className="h-6 w-6" />;
    }
  };

  const getRiskDescription = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return 'Your current lifestyle and health indicators suggest a low risk for heart disease. Continue maintaining your healthy habits!';
      case 'Medium':
        return 'You have some risk factors that could contribute to heart disease. Consider making lifestyle changes and consulting with your healthcare provider.';
      case 'High':
        return 'You have multiple risk factors for heart disease. It\'s important to take immediate action and work closely with your healthcare provider.';
      default:
        return '';
    }
  };

  const getRecommendations = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return [
          'Continue regular physical activity',
          'Maintain a balanced, heart-healthy diet',
          'Monitor your health metrics regularly',
          'Avoid smoking and limit alcohol consumption'
        ];
      case 'Medium':
        return [
          'Increase physical activity to 150+ minutes per week',
          'Focus on reducing sodium and saturated fat intake',
          'Monitor blood pressure and cholesterol regularly',
          'Consider stress management techniques',
          'Schedule regular check-ups with your doctor'
        ];
      case 'High':
        return [
          'Consult with a cardiologist immediately',
          'Implement strict dietary changes',
          'Begin a supervised exercise program',
          'Take prescribed medications as directed',
          'Monitor vital signs daily',
          'Consider cardiac rehabilitation programs'
        ];
      default:
        return [];
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Assessment Results */}
        <div className="lg:col-span-2 space-y-8">
          {/* Risk Assessment Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="h-8 w-8 text-primary" />
                Your Heart Disease Risk Assessment
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                  {getRiskIcon(result.riskLevel)}
                  <Badge 
                    variant="secondary"
                    className={`text-white text-lg px-4 py-2 ${getRiskColor(result.riskLevel)}`}
                  >
                    {result.riskLevel} Risk
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg">Risk Score: {result.riskScore}/150</p>
                  <Progress value={(result.riskScore / 150) * 100} className="w-full max-w-md mx-auto" />
                </div>
                
                <p className="max-w-2xl mx-auto text-muted-foreground">
                  {getRiskDescription(result.riskLevel)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                Recommended Actions
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3">
                {getRecommendations(result.riskLevel).map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Diet Plan Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Utensils className="h-6 w-6 text-primary" />
                Personalized Diet Plan
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Based on your {result.riskLevel.toLowerCase()} risk assessment and dietary preferences, here are tailored recommendations:
                </p>
                
                <ul className="space-y-3">
                  {result.dietPlan.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Utensils className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Assessment Details</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div><strong>Age:</strong> {result.healthData.age} years</div>
                  <div><strong>Gender:</strong> {result.healthData.gender}</div>
                  <div><strong>BMI:</strong> {result.healthData.bmi}</div>
                  <div><strong>Blood Pressure:</strong> {result.healthData.bloodPressure.systolic}/{result.healthData.bloodPressure.diastolic} mmHg</div>
                  <div><strong>Cholesterol:</strong> {result.healthData.cholesterol} mg/dL</div>
                </div>
                
                <div className="space-y-2">
                  <div><strong>Smoking Status:</strong> {result.healthData.smoking}</div>
                  <div><strong>Activity Level:</strong> {result.healthData.lifestyle}</div>
                  <div><strong>Diabetes:</strong> {result.healthData.diabetes ? 'Yes' : 'No'}</div>
                  <div><strong>Family History:</strong> {result.healthData.familyHistory ? 'Yes' : 'No'}</div>
                  <div><strong>Assessment Date:</strong> {new Date(result.date).toLocaleDateString()}</div>
                </div>
              </div>
              
              {(result.healthData.allergies || result.healthData.foodRestrictions) && (
                <div className="mt-4 pt-4 border-t border-border">
                  {result.healthData.allergies && (
                    <div className="mb-2 text-sm">
                      <strong>Allergies:</strong> {result.healthData.allergies}
                    </div>
                  )}
                  {result.healthData.foodRestrictions && (
                    <div className="text-sm">
                      <strong>Dietary Restrictions:</strong> {result.healthData.foodRestrictions}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Chatbot */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <HeartChatbot riskLevel={result.riskLevel} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button onClick={onNewAssessment} size="lg">
          Take New Assessment
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.print()}>
          Print Results
        </Button>
      </div>
    </div>
  );
}