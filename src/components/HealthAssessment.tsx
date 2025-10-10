import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { HealthData, AssessmentResult, RiskLevel } from '../App';

interface HealthAssessmentProps {
  onComplete: (result: AssessmentResult) => void;
}

export function HealthAssessment({ onComplete }: HealthAssessmentProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<HealthData>>({
    allergies: '',
    foodRestrictions: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  // Mock AI logic for risk assessment
  const calculateRisk = (data: HealthData): { riskLevel: RiskLevel; riskScore: number } => {
    let score = 0;
    
    // Age factor
    if (data.age > 65) score += 30;
    else if (data.age > 55) score += 20;
    else if (data.age > 45) score += 10;
    
    // Gender factor
    if (data.gender === 'male') score += 10;
    
    // Blood pressure
    if (data.bloodPressure.systolic > 140 || data.bloodPressure.diastolic > 90) score += 25;
    else if (data.bloodPressure.systolic > 130 || data.bloodPressure.diastolic > 80) score += 15;
    
    // Cholesterol
    if (data.cholesterol > 240) score += 20;
    else if (data.cholesterol > 200) score += 10;
    
    // BMI
    if (data.bmi > 30) score += 15;
    else if (data.bmi > 25) score += 10;
    
    // Diabetes
    if (data.diabetes) score += 20;
    
    // Family history
    if (data.familyHistory) score += 15;
    
    // Smoking
    if (data.smoking === 'current') score += 25;
    else if (data.smoking === 'former') score += 10;
    
    // Lifestyle
    if (data.lifestyle === 'sedentary') score += 15;
    else if (data.lifestyle === 'moderate') score += 5;
    
    let riskLevel: RiskLevel;
    if (score <= 50) riskLevel = 'Low';
    else if (score <= 100) riskLevel = 'Medium';
    else riskLevel = 'High';
    
    return { riskLevel, riskScore: Math.min(score, 150) };
  };

  // Generate diet plan based on risk level and allergies/restrictions
  const generateDietPlan = (riskLevel: RiskLevel, healthData: HealthData): string[] => {
    const allergies = healthData.allergies.toLowerCase();
    const restrictions = healthData.foodRestrictions.toLowerCase();
    
    const basePlan = [
      'Stay hydrated with 8-10 glasses of water daily'
    ];
    
    // Add fruit and vegetable recommendation based on allergies
    if (!allergies.includes('fruit') && !allergies.includes('vegetable')) {
      basePlan.push('Increase consumption of fruits and vegetables (5-9 servings daily)');
    } else if (!allergies.includes('vegetable')) {
      basePlan.push('Increase consumption of vegetables (5-7 servings daily)');
    } else if (!allergies.includes('fruit')) {
      basePlan.push('Include heart-healthy fruits in your daily diet');
    }
    
    // Add grain recommendation
    if (!allergies.includes('gluten') && !restrictions.includes('gluten')) {
      basePlan.push('Choose whole grains over refined grains');
    } else {
      basePlan.push('Choose gluten-free whole grain alternatives (quinoa, brown rice)');
    }
    
    // Sodium recommendation
    basePlan.push('Limit sodium intake to less than 2,300mg per day');
    
    const lowRiskPlan = [...basePlan];
    const mediumRiskPlan = [...basePlan];
    const highRiskPlan = [...basePlan];
    
    // Add protein recommendations based on allergies/restrictions
    const isVegetarian = restrictions.includes('vegetarian') || restrictions.includes('vegan');
    const isVegan = restrictions.includes('vegan');
    const hasSeafoodAllergy = allergies.includes('fish') || allergies.includes('seafood') || allergies.includes('shellfish');
    const hasNutAllergy = allergies.includes('nut') || allergies.includes('peanut');
    
    if (riskLevel === 'Low') {
      if (isVegan) {
        lowRiskPlan.push('Include plant-based proteins like legumes, tofu, and tempeh');
      } else if (isVegetarian) {
        lowRiskPlan.push('Include lean proteins like legumes, eggs, and dairy products');
      } else if (hasSeafoodAllergy) {
        lowRiskPlan.push('Include lean proteins like poultry, legumes, and lean meats');
      } else {
        lowRiskPlan.push('Include lean proteins like fish, poultry, and legumes');
      }
      
      if (!hasNutAllergy && !isVegan) {
        lowRiskPlan.push('Consume healthy fats from nuts, seeds, and olive oil');
      } else if (!hasNutAllergy && isVegan) {
        lowRiskPlan.push('Consume healthy fats from nuts, seeds, avocado, and olive oil');
      } else {
        lowRiskPlan.push('Consume healthy fats from seeds, avocado, and olive oil');
      }
      
      lowRiskPlan.push('Limit processed foods and added sugars');
    }
    
    if (riskLevel === 'Medium') {
      if (!hasSeafoodAllergy && !isVegan && !isVegetarian) {
        mediumRiskPlan.push('Eat fatty fish (salmon, mackerel) 2-3 times per week for omega-3');
      } else if (isVegan || isVegetarian) {
        mediumRiskPlan.push('Include omega-3 rich foods like flax seeds, chia seeds, and walnuts');
      } else {
        mediumRiskPlan.push('Consider omega-3 supplements or plant-based omega-3 sources');
      }
      
      mediumRiskPlan.push('Reduce saturated fat to less than 7% of daily calories');
      mediumRiskPlan.push('Include soluble fiber foods (oats, beans, apples)');
      
      if (isVegan) {
        mediumRiskPlan.push('Focus on plant-based protein sources like quinoa, lentils, and chickpeas');
      } else if (isVegetarian) {
        mediumRiskPlan.push('Include plant-based proteins and low-fat dairy');
      } else {
        mediumRiskPlan.push('Consider plant-based protein sources');
      }
      
      mediumRiskPlan.push('Limit alcohol consumption');
    }
    
    if (riskLevel === 'High') {
      highRiskPlan.push('Follow a Mediterranean or DASH diet pattern (modified for your restrictions)');
      highRiskPlan.push('Severely limit saturated and trans fats');
      
      if (!hasSeafoodAllergy && !isVegan && !isVegetarian) {
        highRiskPlan.push('Include omega-3 rich foods like fatty fish daily');
      } else {
        highRiskPlan.push('Include plant-based omega-3 sources daily (flax seeds, chia seeds, algae)');
      }
      
      highRiskPlan.push('Reduce sodium to less than 1,500mg per day');
      highRiskPlan.push('Eliminate processed and fried foods');
      highRiskPlan.push('Consider consulting a registered dietitian familiar with your dietary restrictions');
      highRiskPlan.push('Monitor portion sizes carefully');
    }
    
    // Add allergy-specific notes if applicable
    if (allergies || restrictions) {
      const finalPlan = riskLevel === 'Low' ? lowRiskPlan : riskLevel === 'Medium' ? mediumRiskPlan : highRiskPlan;
      finalPlan.push(`Note: All recommendations are tailored to avoid your specified allergies and dietary restrictions.`);
      return finalPlan;
    }
    
    switch (riskLevel) {
      case 'Low': return lowRiskPlan;
      case 'Medium': return mediumRiskPlan;
      case 'High': return highRiskPlan;
      default: return basePlan;
    }
  };

  const handleSubmit = async () => {
    if (!isFormComplete()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const healthData = formData as HealthData;
    const { riskLevel, riskScore } = calculateRisk(healthData);
    const dietPlan = generateDietPlan(riskLevel, healthData);
    
    const result: AssessmentResult = {
      id: Date.now().toString(),
      riskLevel,
      riskScore,
      date: new Date().toISOString(),
      healthData,
      dietPlan
    };
    
    setIsSubmitting(false);
    onComplete(result);
  };

  const isFormComplete = () => {
    return formData.age && formData.gender && formData.bloodPressure && 
           formData.cholesterol && formData.bmi && formData.diabetes !== undefined &&
           formData.familyHistory !== undefined && formData.smoking && formData.lifestyle &&
           formData.allergies !== undefined && formData.foodRestrictions !== undefined;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={formData.gender} onValueChange={(value: 'male' | 'female') => 
                setFormData(prev => ({ ...prev, gender: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bmi">BMI (Body Mass Index)</Label>
              <Input
                id="bmi"
                type="number"
                step="0.1"
                placeholder="Enter your BMI"
                value={formData.bmi || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, bmi: parseFloat(e.target.value) }))}
              />
              <p className="text-sm text-muted-foreground">
                Calculate BMI: weight (kg) ÷ height² (m²)
              </p>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Blood Pressure</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systolic">Systolic (top number)</Label>
                  <Input
                    id="systolic"
                    type="number"
                    placeholder="120"
                    value={formData.bloodPressure?.systolic || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      bloodPressure: { 
                        ...prev.bloodPressure!, 
                        systolic: parseInt(e.target.value) 
                      } 
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diastolic">Diastolic (bottom number)</Label>
                  <Input
                    id="diastolic"
                    type="number"
                    placeholder="80"
                    value={formData.bloodPressure?.diastolic || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      bloodPressure: { 
                        ...prev.bloodPressure!, 
                        diastolic: parseInt(e.target.value) 
                      } 
                    }))}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cholesterol">Cholesterol Level (mg/dL)</Label>
              <Input
                id="cholesterol"
                type="number"
                placeholder="Enter your total cholesterol"
                value={formData.cholesterol || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, cholesterol: parseInt(e.target.value) }))}
              />
              <p className="text-sm text-muted-foreground">
                Normal: Less than 200 mg/dL
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Smoking Status</Label>
              <Select value={formData.smoking} onValueChange={(value: 'never' | 'former' | 'current') => 
                setFormData(prev => ({ ...prev, smoking: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select smoking status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never smoked</SelectItem>
                  <SelectItem value="former">Former smoker</SelectItem>
                  <SelectItem value="current">Current smoker</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Physical Activity Level</Label>
              <Select value={formData.lifestyle} onValueChange={(value: 'sedentary' | 'moderate' | 'active') => 
                setFormData(prev => ({ ...prev, lifestyle: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select your activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                  <SelectItem value="moderate">Moderate (exercise 1-3 times/week)</SelectItem>
                  <SelectItem value="active">Active (exercise 3+ times/week)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="diabetes"
                  checked={formData.diabetes}
                  onCheckedChange={(checked: boolean | 'indeterminate') => 
                    setFormData(prev => ({ ...prev, diabetes: checked as boolean }))
                  }
                />
                <Label htmlFor="diabetes">I have diabetes or pre-diabetes</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="family-history"
                  checked={formData.familyHistory}
                  onCheckedChange={(checked: boolean | 'indeterminate') => 
                    setFormData(prev => ({ ...prev, familyHistory: checked as boolean }))
                  }
                />
                <Label htmlFor="family-history">
                  I have a family history of heart disease (parents, siblings)
                </Label>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="allergies">Food Allergies</Label>
              <Textarea
                id="allergies"
                placeholder="List any food allergies (e.g., nuts, seafood, dairy, etc.). Leave blank if none."
                value={formData.allergies || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                className="min-h-20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="food-restrictions">Dietary Restrictions</Label>
              <Textarea
                id="food-restrictions"
                placeholder="List any dietary restrictions or preferences (e.g., vegetarian, vegan, gluten-free, etc.). Leave blank if none."
                value={formData.foodRestrictions || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, foodRestrictions: e.target.value }))}
                className="min-h-20"
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              This information will help us provide personalized diet recommendations that work with your specific needs and preferences.
            </p>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Review Your Information</h3>
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Age:</strong> {formData.age} years</div>
                <div><strong>Gender:</strong> {formData.gender}</div>
                <div><strong>BMI:</strong> {formData.bmi}</div>
                <div><strong>Blood Pressure:</strong> {formData.bloodPressure?.systolic}/{formData.bloodPressure?.diastolic} mmHg</div>
                <div><strong>Cholesterol:</strong> {formData.cholesterol} mg/dL</div>
                <div><strong>Smoking:</strong> {formData.smoking}</div>
                <div><strong>Activity Level:</strong> {formData.lifestyle}</div>
                <div><strong>Diabetes:</strong> {formData.diabetes ? 'Yes' : 'No'}</div>
                <div><strong>Family History:</strong> {formData.familyHistory ? 'Yes' : 'No'}</div>
              </div>
              
              {(formData.allergies || formData.foodRestrictions) && (
                <div className="mt-4 pt-4 border-t border-border">
                  {formData.allergies && (
                    <div className="mb-2">
                      <strong>Allergies:</strong> {formData.allergies}
                    </div>
                  )}
                  {formData.foodRestrictions && (
                    <div>
                      <strong>Dietary Restrictions:</strong> {formData.foodRestrictions}
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              Please review your information carefully. Click "Get My Risk Assessment" to proceed with the AI analysis.
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Heart Health Assessment
            <span className="text-sm font-normal text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
          </CardTitle>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setStep(prev => Math.max(1, prev - 1))}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < totalSteps ? (
              <Button
                onClick={() => setStep(prev => prev + 1)}
                disabled={
                  (step === 1 && (!formData.age || !formData.gender || !formData.bmi)) ||
                  (step === 2 && (!formData.bloodPressure || !formData.cholesterol || !formData.smoking)) ||
                  (step === 3 && (!formData.lifestyle || formData.diabetes === undefined || formData.familyHistory === undefined)) ||
                  (step === 4 && (formData.allergies === undefined || formData.foodRestrictions === undefined))
                }
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isFormComplete() || isSubmitting}
              >
                {isSubmitting ? 'Analyzing...' : 'Get My Risk Assessment'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}