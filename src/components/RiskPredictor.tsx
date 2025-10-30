import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { predictRisk } from '../utils/api';

export function RiskPredictor() {
  const [form, setForm] = useState<any>({
    age: 50,
    gender: 'male',
    bloodPressure: { systolic: 120, diastolic: 80 },
    cholesterol: 200,
    bmi: 25,
    diabetes: false,
    smoking: 'never',
    lifestyle: 'moderate'
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (k: string, v: any) => setForm((s: any) => ({ ...s, [k]: v }));

  const submit = async () => {
    setLoading(true);
    try {
      const res = await predictRisk(form);
      setResult(res);
    } catch (e) {
      setResult({ error: String(e) });
    }
    setLoading(false);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Risk Predictor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label>Age</label>
            <Input value={form.age} onChange={(e:any)=>handleChange('age', Number(e.target.value))} />
          </div>
          <div>
            <label>Gender</label>
            <Input value={form.gender} onChange={(e:any)=>handleChange('gender', e.target.value)} />
          </div>
          <div>
            <label>Cholesterol</label>
            <Input value={form.cholesterol} onChange={(e:any)=>handleChange('cholesterol', Number(e.target.value))} />
          </div>
          <div>
            <label>BMI</label>
            <Input value={form.bmi} onChange={(e:any)=>handleChange('bmi', Number(e.target.value))} />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={submit} disabled={loading}>{loading? 'Predicting...':'Predict Risk'}</Button>
        </div>

        {result && (
          <pre className="mt-4 p-2 bg-muted rounded">{JSON.stringify(result, null, 2)}</pre>
        )}
      </CardContent>
    </Card>
  );
}
