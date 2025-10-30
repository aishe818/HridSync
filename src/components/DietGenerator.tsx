import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { generateDiet } from '../utils/api';

export function DietGenerator() {
  const [preferences, setPreferences] = useState<any>({ vegetarian: false, dislikes: '', allergies: '' });
  const [goals, setGoals] = useState('heart-health');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const payload = { preferences: { vegetarian: preferences.vegetarian, dislikes: preferences.dislikes.split(',').map((s:string)=>s.trim()).filter(Boolean), allergies: preferences.allergies.split(',').map((s:string)=>s.trim()).filter(Boolean) }, goals };
      const res = await generateDiet(payload);
      setResult(res);
    } catch (e) {
      setResult({ error: String(e) });
    }
    setLoading(false);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Diet Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          <label>Dislikes (comma separated)</label>
          <Input value={preferences.dislikes} onChange={(e:any)=>setPreferences((p:any)=>({...p, dislikes: e.target.value}))} />
          <label>Allergies (comma separated)</label>
          <Input value={preferences.allergies} onChange={(e:any)=>setPreferences((p:any)=>({...p, allergies: e.target.value}))} />
          <label>Vegetarian</label>
          <input type="checkbox" checked={preferences.vegetarian} onChange={(e:any)=>setPreferences((p:any)=>({...p, vegetarian: e.target.checked}))} />
        </div>
        <div className="mt-4">
          <Button onClick={submit} disabled={loading}>{loading? 'Generating...':'Generate Diet'}</Button>
        </div>

        {result && (
          <pre className="mt-4 p-2 bg-muted rounded">{JSON.stringify(result, null, 2)}</pre>
        )}
      </CardContent>
    </Card>
  );
}
