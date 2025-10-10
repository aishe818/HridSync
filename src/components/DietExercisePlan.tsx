import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, AssessmentResult } from '../App';
import { 
  Heart, 
  Utensils, 
  Dumbbell, 
  MessageCircle, 
  Download, 
  Clock, 
  Target,
  Apple,
  Zap,
  TrendingUp
} from 'lucide-react';

interface DietExercisePlanProps {
  user: User;
  latestResult?: AssessmentResult;
  onStartChat: () => void;
}

export function DietExercisePlan({ user, latestResult, onStartChat }: DietExercisePlanProps) {
  const [activeTab, setActiveTab] = useState('diet');

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'bg-emerald-500';
      case 'Medium': return 'bg-amber-500';
      case 'High': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const sampleDietPlan = [
    {
      meal: 'Breakfast',
      items: ['Oatmeal with berries and almonds', 'Green tea', '1 slice whole grain toast'],
      calories: 350,
      time: '7:00 AM'
    },
    {
      meal: 'Mid-Morning Snack',
      items: ['Apple with 1 tbsp almond butter'],
      calories: 150,
      time: '10:00 AM'
    },
    {
      meal: 'Lunch',
      items: ['Grilled salmon with quinoa', 'Mixed green salad', 'Steamed broccoli'],
      calories: 450,
      time: '1:00 PM'
    },
    {
      meal: 'Afternoon Snack',
      items: ['Greek yogurt with walnuts'],
      calories: 120,
      time: '4:00 PM'
    },
    {
      meal: 'Dinner',
      items: ['Baked chicken breast', 'Sweet potato', 'Asparagus'],
      calories: 400,
      time: '7:00 PM'
    }
  ];

  const sampleExercisePlan = [
    {
      day: 'Monday',
      type: 'Cardio',
      exercises: ['30 min brisk walking', '10 min stretching'],
      duration: 40,
      intensity: 'Moderate'
    },
    {
      day: 'Tuesday',
      type: 'Strength',
      exercises: ['Light weight training', 'Core exercises', 'Cool down'],
      duration: 45,
      intensity: 'Light'
    },
    {
      day: 'Wednesday',
      type: 'Cardio',
      exercises: ['Swimming or cycling', 'Yoga'],
      duration: 50,
      intensity: 'Moderate'
    },
    {
      day: 'Thursday',
      type: 'Rest',
      exercises: ['Light stretching', 'Meditation'],
      duration: 20,
      intensity: 'Light'
    },
    {
      day: 'Friday',
      type: 'Full Body',
      exercises: ['Circuit training', 'Flexibility work'],
      duration: 40,
      intensity: 'Moderate'
    },
    {
      day: 'Saturday',
      type: 'Cardio',
      exercises: ['Dance or sports activity', 'Cool down'],
      duration: 45,
      intensity: 'Moderate'
    },
    {
      day: 'Sunday',
      type: 'Active Rest',
      exercises: ['Nature walk', 'Gentle yoga'],
      duration: 30,
      intensity: 'Light'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl flex items-center gap-3">
            <Utensils className="w-8 h-8 text-primary" />
            Personalized Diet & Exercise Plan
          </h1>
          <p className="text-muted-foreground">
            {latestResult 
              ? `Based on your ${latestResult.riskLevel.toLowerCase()} risk assessment` 
              : 'Take an assessment to get personalized recommendations'
            }
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button onClick={onStartChat} variant="outline">
            <MessageCircle className="w-4 h-4 mr-2" />
            AI Nutrition Chat
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Download Plan
          </Button>
        </div>
      </div>

      {/* Risk Status Card */}
      {latestResult && (
        <Card className="border-l-4 border-l-primary">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge 
                  variant="secondary"
                  className={`text-white ${getRiskColor(latestResult.riskLevel)}`}
                >
                  {latestResult.riskLevel} Risk Level
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Last assessment: {new Date(latestResult.date).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Risk Score</p>
                <p className="text-2xl">{latestResult.riskScore}/150</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="diet">Diet Plan</TabsTrigger>
          <TabsTrigger value="exercise">Exercise Plan</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition Tips</TabsTrigger>
        </TabsList>

        {/* Diet Plan Tab */}
        <TabsContent value="diet" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-primary" />
                    Daily Meal Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sampleDietPlan.map((meal, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{meal.meal}</h4>
                            <div className="text-sm text-muted-foreground flex items-center gap-4">
                              <span>{meal.time}</span>
                              <span>{meal.calories} cal</span>
                            </div>
                          </div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {meal.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-center gap-2">
                                <Apple className="w-3 h-3" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Daily Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl text-primary">1,470</div>
                      <div className="text-sm text-muted-foreground">Total Calories</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-secondary/30 rounded">
                        <div className="text-lg">45%</div>
                        <div className="text-xs text-muted-foreground">Carbs</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/30 rounded">
                        <div className="text-lg">25%</div>
                        <div className="text-xs text-muted-foreground">Protein</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/30 rounded">
                        <div className="text-lg">30%</div>
                        <div className="text-xs text-muted-foreground">Fats</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Heart-Healthy Foods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>Omega-3 rich fish</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>Leafy green vegetables</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>Whole grains</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>Nuts and seeds</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Exercise Plan Tab */}
        <TabsContent value="exercise" className="space-y-6">
          <div className="grid lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl">270</div>
                <div className="text-sm text-muted-foreground">Weekly Minutes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Dumbbell className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl">5</div>
                <div className="text-sm text-muted-foreground">Days Active</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl">Moderate</div>
                <div className="text-sm text-muted-foreground">Intensity</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl">Progressive</div>
                <div className="text-sm text-muted-foreground">Approach</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4">
            {sampleExercisePlan.map((day, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg">{day.day}</h3>
                      <Badge variant="outline">{day.type}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="text-lg">{day.duration} min</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{exercise}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Intensity: {day.intensity}</span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Nutrition Tips Tab */}
        <TabsContent value="nutrition" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-600">
                  <Heart className="w-5 h-5" />
                  Heart-Healthy Foods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <h4 className="font-medium text-emerald-800 dark:text-emerald-200">Fatty Fish</h4>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      Salmon, mackerel, sardines - rich in omega-3 fatty acids
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <h4 className="font-medium text-emerald-800 dark:text-emerald-200">Leafy Greens</h4>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      Spinach, kale, arugula - packed with vitamins and minerals
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <h4 className="font-medium text-emerald-800 dark:text-emerald-200">Whole Grains</h4>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      Oats, quinoa, brown rice - support heart health
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Heart className="w-5 h-5" />
                  Foods to Limit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <h4 className="font-medium text-red-800 dark:text-red-200">Processed Foods</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      High in sodium and unhealthy trans fats
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <h4 className="font-medium text-red-800 dark:text-red-200">Sugary Drinks</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Sodas, energy drinks - linked to heart disease
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <h4 className="font-medium text-red-800 dark:text-red-200">Excessive Salt</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Can raise blood pressure and strain the heart
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Nutrition Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Portion Control</h4>
                      <p className="text-sm text-muted-foreground">Use smaller plates and be mindful of serving sizes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Stay Hydrated</h4>
                      <p className="text-sm text-muted-foreground">Aim for 8-10 glasses of water daily</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Regular Meals</h4>
                      <p className="text-sm text-muted-foreground">Eat at consistent times to maintain energy</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs text-primary">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Read Labels</h4>
                      <p className="text-sm text-muted-foreground">Check sodium, sugar, and trans fat content</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs text-primary">5</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Mindful Eating</h4>
                      <p className="text-sm text-muted-foreground">Eat slowly and pay attention to hunger cues</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs text-primary">6</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Plan Ahead</h4>
                      <p className="text-sm text-muted-foreground">Meal prep to avoid unhealthy food choices</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}