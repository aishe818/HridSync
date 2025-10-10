import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, AssessmentResult } from '../App';
import { 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  FileText, 
  BarChart3, 
  Heart,
  Target,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface ProgressReportsProps {
  user: User;
  assessmentResults: AssessmentResult[];
}

export function ProgressReports({ user, assessmentResults }: ProgressReportsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'text-emerald-600';
      case 'Medium': return 'text-amber-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBgColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'bg-emerald-500';
      case 'Medium': return 'bg-amber-500';
      case 'High': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateTrend = () => {
    if (assessmentResults.length < 2) return { trend: 'stable', change: 0 };
    
    const latest = assessmentResults[assessmentResults.length - 1];
    const previous = assessmentResults[assessmentResults.length - 2];
    const change = latest.riskScore - previous.riskScore;
    
    if (change > 5) return { trend: 'increasing', change };
    if (change < -5) return { trend: 'decreasing', change };
    return { trend: 'stable', change };
  };

  const generateReport = (format: 'pdf' | 'html') => {
    // Simulate report generation
    const reportData = {
      user: user.name,
      date: new Date().toLocaleDateString(),
      assessments: assessmentResults.length,
      currentRisk: assessmentResults[assessmentResults.length - 1]?.riskLevel || 'Unknown',
      trend: calculateTrend()
    };
    
    console.log(`Generating ${format.toUpperCase()} report:`, reportData);
    // In a real implementation, this would trigger actual report generation
  };

  const trend = calculateTrend();

  // Generate mock improvement suggestions
  const improvements = [
    {
      category: 'Diet',
      suggestion: 'Increase omega-3 rich foods like salmon and walnuts',
      impact: 'High',
      timeline: '2-4 weeks'
    },
    {
      category: 'Exercise',
      suggestion: 'Add 150 minutes of moderate cardio per week',
      impact: 'High',
      timeline: '4-6 weeks'
    },
    {
      category: 'Lifestyle',
      suggestion: 'Reduce sodium intake to under 2300mg daily',
      impact: 'Medium',
      timeline: '1-2 weeks'
    },
    {
      category: 'Sleep',
      suggestion: 'Maintain 7-9 hours of quality sleep nightly',
      impact: 'Medium',
      timeline: '2-3 weeks'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            Progress Reports
          </h1>
          <p className="text-muted-foreground">
            Track your heart health journey and download detailed reports
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => generateReport('html')}>
            <FileText className="w-4 h-4 mr-2" />
            HTML Report
          </Button>
          <Button onClick={() => generateReport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            PDF Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Heart className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl">{assessmentResults.length}</p>
                <p className="text-sm text-muted-foreground">Total Assessments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <p className={`text-2xl ${getRiskColor(assessmentResults[assessmentResults.length - 1]?.riskLevel || 'Unknown')}`}>
                  {assessmentResults[assessmentResults.length - 1]?.riskLevel || 'N/A'}
                </p>
                <p className="text-sm text-muted-foreground">Current Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {trend.trend === 'decreasing' ? (
                <TrendingDown className="w-8 h-8 text-emerald-600" />
              ) : trend.trend === 'increasing' ? (
                <TrendingUp className="w-8 h-8 text-red-600" />
              ) : (
                <Activity className="w-8 h-8 text-amber-600" />
              )}
              <div>
                <p className="text-2xl">
                  {trend.change > 0 ? '+' : ''}{trend.change}
                </p>
                <p className="text-sm text-muted-foreground">Score Change</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Calendar className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl">
                  {assessmentResults.length > 0 
                    ? Math.ceil((Date.now() - new Date(assessmentResults[0].date).getTime()) / (1000 * 60 * 60 * 24))
                    : 0
                  }
                </p>
                <p className="text-sm text-muted-foreground">Days Tracked</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="improvements">Improvements</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Level Trend</CardTitle>
              </CardHeader>
              <CardContent>
                {assessmentResults.length > 0 ? (
                  <div className="space-y-4">
                    {assessmentResults.slice(-5).map((result, index) => (
                      <div key={result.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-muted-foreground">
                            {new Date(result.date).toLocaleDateString()}
                          </div>
                          <Badge 
                            variant="secondary"
                            className={`text-white ${getRiskBgColor(result.riskLevel)}`}
                          >
                            {result.riskLevel}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-lg">{result.riskScore}</div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="w-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No assessments available yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Metrics Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {assessmentResults.length > 0 ? (
                  <div className="space-y-4">
                    {(() => {
                      const latest = assessmentResults[assessmentResults.length - 1];
                      return (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Blood Pressure</span>
                            <span className="font-medium">
                              {latest.healthData.bloodPressure.systolic}/{latest.healthData.bloodPressure.diastolic}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">BMI</span>
                            <span className="font-medium">{latest.healthData.bmi}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Cholesterol</span>
                            <span className="font-medium">{latest.healthData.cholesterol} mg/dL</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Age</span>
                            <span className="font-medium">{latest.healthData.age} years</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Lifestyle</span>
                            <span className="font-medium capitalize">{latest.healthData.lifestyle}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Take an assessment to see your metrics</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Trend Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-secondary/30 rounded-lg">
                  {trend.trend === 'decreasing' ? (
                    <TrendingDown className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  ) : trend.trend === 'increasing' ? (
                    <TrendingUp className="w-12 h-12 text-red-600 mx-auto mb-3" />
                  ) : (
                    <Activity className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                  )}
                  <h4 className="font-semibold">Risk Trend</h4>
                  <p className="text-sm text-muted-foreground capitalize">
                    {trend.trend === 'decreasing' ? 'Improving' : trend.trend === 'increasing' ? 'Needs Attention' : 'Stable'}
                  </p>
                </div>
                
                <div className="text-center p-6 bg-secondary/30 rounded-lg">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold">Consistency</h4>
                  <p className="text-sm text-muted-foreground">
                    {assessmentResults.length >= 3 ? 'Good' : 'Needs More Data'}
                  </p>
                </div>
                
                <div className="text-center p-6 bg-secondary/30 rounded-lg">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold">Next Assessment</h4>
                  <p className="text-sm text-muted-foreground">
                    {assessmentResults.length > 0 ? 'In 3 months' : 'Take first assessment'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assessment History Tab */}
        <TabsContent value="assessments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assessment History</CardTitle>
            </CardHeader>
            <CardContent>
              {assessmentResults.length > 0 ? (
                <div className="space-y-4">
                  {assessmentResults.slice().reverse().map((result, index) => (
                    <div key={result.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant="secondary"
                            className={`text-white ${getRiskBgColor(result.riskLevel)}`}
                          >
                            {result.riskLevel} Risk
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(result.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{result.riskScore}/150</div>
                          <div className="text-xs text-muted-foreground">Risk Score</div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">BP:</span> {result.healthData.bloodPressure.systolic}/{result.healthData.bloodPressure.diastolic}
                        </div>
                        <div>
                          <span className="text-muted-foreground">BMI:</span> {result.healthData.bmi}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Cholesterol:</span> {result.healthData.cholesterol}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Lifestyle:</span> {result.healthData.lifestyle}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg mb-2">No Assessments Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Take your first assessment to start tracking your progress.
                  </p>
                  <Button>Take Assessment</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Improvements Tab */}
        <TabsContent value="improvements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Improvements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {improvements.map((improvement, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{improvement.category}</h4>
                        <Badge variant="outline" className="text-xs">
                          {improvement.impact} Impact
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {improvement.timeline}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {improvement.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <Target className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Risk Reduction</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Achieve and maintain low risk status
                    </p>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (150 - (assessmentResults[assessmentResults.length - 1]?.riskScore || 150)) / 100 * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-center p-6 border rounded-lg">
                    <Activity className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Regular Monitoring</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete assessments every 3 months
                    </p>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${Math.min(100, assessmentResults.length * 25)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-center p-6 border rounded-lg">
                    <Heart className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Lifestyle Changes</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Implement heart-healthy habits
                    </p>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-secondary/30 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Next Steps
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Schedule next assessment in 3 months
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Implement top 2 recommended improvements
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Track daily nutrition and exercise
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Consider premium consultation if needed
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}