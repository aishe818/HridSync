import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, User, LogOut, Users, FileText, Crown, Stethoscope } from 'lucide-react';
import { User as UserType } from '../App';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: 'landing' | 'assessment' | 'results' | 'login' | 'register' | 'dashboard' | 'about' | 'contact' | 'nutritionists' | 'chat' | 'reports' | 'admin') => void;
  user: UserType | null;
  onLogout: () => void;
}

export function Navbar({ currentPage, setCurrentPage, user, onLogout }: NavbarProps) {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('landing')}
          >
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-semibold">HridSync</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Common navigation for all users */}
            <Button
              variant={currentPage === 'about' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('about')}
            >
              About Us
            </Button>
            <Button
              variant={currentPage === 'contact' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('contact')}
            >
              Contact
            </Button>
            
            {user ? (
              <>
                <div className="h-6 w-px bg-border mx-2"></div>
                
                {/* Doctor Navigation */}
                {user.userType === 'doctor' ? (
                  <>
                    <Button
                      variant={currentPage === 'admin' ? 'default' : 'ghost'}
                      onClick={() => setCurrentPage('admin')}
                      className="flex items-center gap-2"
                    >
                      <Stethoscope className="h-4 w-4" />
                      Doctor Dashboard
                    </Button>
                    
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      <Stethoscope className="h-3 w-3 mr-1" />
                      Doctor
                    </Badge>
                  </>
                ) : (
                  /* User Navigation */
                  <>
                    <Button
                      variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                      onClick={() => setCurrentPage('dashboard')}
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button
                      variant={currentPage === 'assessment' ? 'default' : 'ghost'}
                      onClick={() => setCurrentPage('assessment')}
                    >
                      New Assessment
                    </Button>
                    
                    {/* Premium Features */}
                    <Button
                      variant={currentPage === 'nutritionists' ? 'default' : 'ghost'}
                      onClick={() => setCurrentPage('nutritionists')}
                      className="flex items-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      Nutritionists
                      {!user.isPremium && <Crown className="h-3 w-3 text-amber-500" />}
                    </Button>
                    
                    <Button
                      variant={currentPage === 'reports' ? 'default' : 'ghost'}
                      onClick={() => setCurrentPage('reports')}
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Reports
                    </Button>
                    
                    {/* User Status Badge */}
                    {user.isPremium && (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </>
                )}
                
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <div className="h-6 w-px bg-border mx-2"></div>
                <Button
                  variant={currentPage === 'assessment' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('assessment')}
                >
                  Take Assessment
                </Button>
                <Button
                  variant={currentPage === 'login' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('login')}
                >
                  Login
                </Button>
                <Button
                  variant={currentPage === 'register' ? 'default' : 'outline'}
                  onClick={() => setCurrentPage('register')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}