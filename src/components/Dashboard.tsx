import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { User, AssessmentResult } from '../App';
import { Heart, TrendingUp, Calendar, User as UserIcon, BarChart3, MessageCircle, Users, FileText, Crown } from 'lucide-react';
import { HeartChatbot } from './HeartChatbot';

interface DashboardProps {
  user: User;
  results: AssessmentResult[];
  onNewAssessment: () => void;
  onNavigate?: (page: 'nutritionists' | 'reports') => void;
}

export function Dashboard({ user, results, onNewAssessment, onNavigate }: DashboardProps) {
  const latestResult = results[results.length - 1];
  
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'bg-emerald-500';
      case 'Medium': return 'bg-amber-500';
      case 'High': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatistics = () => {
    const totalAssessments = results.length;
    const riskLevels = results.map(r => r.riskLevel);
    const lowRisk = riskLevels.filter(r => r === 'Low').length;
    const mediumRisk = riskLevels.filter(r => r === 'Medium').length;
    const highRisk = riskLevels.filter(r => r === 'High').length;
    
    return { totalAssessments, lowRisk, mediumRisk, highRisk };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Track your heart health journey with HridSync</p>
        </div>
        <Button onClick={onNewAssessment} size="lg">
          New Assessment
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalAssessments}</p>
                <p className="text-sm text-muted-foreground">Total Assessments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Heart className="h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-2xl font-bold">{stats.lowRisk}</p>
                <p className="text-sm text-muted-foreground">Low Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Heart className="h-8 w-8 text-amber-600" />
              <div>
                <p className="text-2xl font-bold">{stats.mediumRisk}</p>
                <p className="text-sm text-muted-foreground">Medium Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Heart className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{stats.highRisk}</p>
                <p className="text-sm text-muted-foreground">High Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest Assessment */}
      {latestResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Latest Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Badge 
                  variant="secondary"
                  className={`text-white ${getRiskColor(latestResult.riskLevel)}`}
                >
                  {latestResult.riskLevel} Risk
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Score: {latestResult.riskScore}/150
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(latestResult.date).toLocaleDateString()}
              </span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Age:</strong> {latestResult.healthData.age} years
              </div>
              <div>
                <strong>BMI:</strong> {latestResult.healthData.bmi}
              </div>
              <div>
                <strong>Blood Pressure:</strong> {latestResult.healthData.bloodPressure.systolic}/{latestResult.healthData.bloodPressure.diastolic}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Premium Features Quick Access */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate?.('nutritionists')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <Users className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <h3 className="font-semibold flex items-center gap-2">
                  Consult Nutritionists
                  {!user.isPremium && <Crown className="h-4 w-4 text-amber-500" />}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Connect with verified nutrition experts
                </p>
              </div>
            </div>
            <Button 
              variant={user.isPremium ? "default" : "outline"} 
              size="sm" 
              className="w-full"
            >
              {user.isPremium ? 'Browse Nutritionists' : 'Upgrade to Premium'}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate?.('reports')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <FileText className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <h3 className="font-semibold">Progress Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Download detailed health analytics
                </p>
              </div>
            </div>
            <Button variant="default" size="sm" className="w-full">
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="history">Assessment History</TabsTrigger>
          <TabsTrigger value="diet">Diet Plans</TabsTrigger>
          <TabsTrigger value="chat">Heart Assistant</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="space-y-4">
          {results.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Assessments Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Take your first heart health assessment to get started with HridSync.
                </p>
                <Button onClick={onNewAssessment}>
                  Take Assessment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {results.slice().reverse().map((result) => (
                <Card key={result.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Badge 
                          variant="secondary"
                          className={`text-white ${getRiskColor(result.riskLevel)}`}
                        >
                          {result.riskLevel} Risk
                        </Badge>
                        <span className="text-sm">Score: {result.riskScore}/150</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(result.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div><strong>Age:</strong> {result.healthData.age}</div>
                      <div><strong>BMI:</strong> {result.healthData.bmi}</div>
                      <div><strong>BP:</strong> {result.healthData.bloodPressure.systolic}/{result.healthData.bloodPressure.diastolic}</div>
                      <div><strong>Cholesterol:</strong> {result.healthData.cholesterol}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="diet" className="space-y-4">
          {latestResult ? (
            <Card>
              <CardHeader>
                <CardTitle>Current Diet Plan</CardTitle>
                <p className="text-muted-foreground">
                  Based on your {latestResult.riskLevel.toLowerCase()} risk assessment
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {latestResult.dietPlan.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Take an assessment to receive personalized diet recommendations.
                </p>
                <Button onClick={onNewAssessment} className="mt-4">
                  Take Assessment
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="chat" className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <HeartChatbot riskLevel={latestResult?.riskLevel} />
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Quick Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <h4 className="font-medium mb-1">Ask about:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Heart-healthy foods and recipes</li>
                      <li>• Exercise recommendations</li>
                      <li>• Managing blood pressure</li>
                      <li>• Cholesterol reduction tips</li>
                      <li>• Stress management techniques</li>
                      <li>• Lifestyle modifications</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              {latestResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Risk Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current Risk</span>
                        <Badge 
                          variant="secondary"
                          className={`text-white ${getRiskColor(latestResult.riskLevel)}`}
                        >
                          {latestResult.riskLevel}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        The assistant will provide advice tailored to your {latestResult.riskLevel.toLowerCase()} risk level.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Name</Label>
                <p className="text-lg">{user.name}</p>
              </div>
              
              <div>
                <Label>Email</Label>
                <p className="text-lg">{user.email}</p>
              </div>
              
              <div>
                <Label>Member Since</Label>
                <p className="text-lg">Today</p>
              </div>
              
              <Button variant="outline">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}