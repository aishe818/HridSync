import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User } from '../App';
import { Eye, EyeOff, User as UserIcon, Stethoscope } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  onSwitchToRegister: () => void;
}

export function Login({ onLogin, onSwitchToRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'user' | 'doctor'>('user');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would validate credentials
    const mockUser: User = {
      id: '1',
      email: email,
      name: email.split('@')[0], // Use part before @ as name
      userType: userType
    };
    
    setIsLoading(false);
    onLogin(mockUser);
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Welcome Back to HridSync</CardTitle>
          <p className="text-center text-muted-foreground">
            Sign in to access your dashboard
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label>I am a</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('user')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                    userType === 'user'
                      ? 'border-primary bg-secondary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <UserIcon className={`h-6 w-6 ${userType === 'user' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={userType === 'user' ? 'text-primary' : 'text-muted-foreground'}>User</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('doctor')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                    userType === 'doctor'
                      ? 'border-primary bg-secondary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Stethoscope className={`h-6 w-6 ${userType === 'doctor' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={userType === 'doctor' ? 'text-primary' : 'text-muted-foreground'}>Doctor</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" onClick={onSwitchToRegister} className="p-0">
                Sign up here
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}