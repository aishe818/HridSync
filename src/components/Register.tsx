import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { User } from '../App';
import { createUser, findUserByEmail } from '../utils/auth';
import { Eye, EyeOff, User as UserIcon, Stethoscope } from 'lucide-react';

interface RegisterProps {
  onRegister: (user: User) => void;
  onSwitchToLogin: () => void;
}

export function Register({ onRegister, onSwitchToLogin }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'user' | 'doctor'>('user');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setIsLoading(true);

    // Prevent duplicate emails
    const existing = findUserByEmail(email);
    if (existing) {
      setIsLoading(false);
      alert('An account with this email already exists. Please sign in or use a different email.');
      return;
    }

    // Persist user to localStorage (demo only). Passwords are base64-encoded here for minimal obfuscation.
    const stored = createUser({
      name,
      email,
      password: btoa(password),
      userType
    });

    const mockUser: User = {
      id: stored.id,
      email: stored.email,
      name: stored.name,
      userType: stored.userType
    };

    setIsLoading(false);
    onRegister(mockUser);
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Join HridSync</CardTitle>
          <p className="text-center text-muted-foreground">
            Create your account to get started
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
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
                  placeholder="Create a password"
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
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked: boolean | 'indeterminate') => setAgreeToTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions and privacy policy
              </Label>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading || !agreeToTerms}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Button variant="link" onClick={onSwitchToLogin} className="p-0">
                Sign in here
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}