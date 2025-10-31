import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Nutritionist } from '../App';
import { 
  Star, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Filter, 
  Crown, 
  CheckCircle,
  Search,
  Heart,
  DollarSign,
  Users
} from 'lucide-react';

interface NutritionistDirectoryProps {
  user: User | null;
  onSelectNutritionist: (nutritionist: Nutritionist) => void;
  onUpgradeToPremium: () => void;
}

export function NutritionistDirectory({ user, onSelectNutritionist, onUpgradeToPremium }: NutritionistDirectoryProps) {
  const [nutritionists, setNutritionists] = useState<Nutritionist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    fetch('/api/nutritionists')
      .then(res => res.json())
      .then(data => setNutritionists(data.nutritionists));
  }, []);

  const filteredNutritionists = nutritionists
    .filter(nutritionist => 
      nutritionist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nutritionist.specialization.some(spec => 
        spec.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter(nutritionist => 
      specialtyFilter === 'all' || 
      nutritionist.specialization.includes(specialtyFilter)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'price-low':
          return a.hourlyRate - b.hourlyRate;
        case 'price-high':
          return b.hourlyRate - a.hourlyRate;
        default:
          return 0;
      }
    });

  const handleConsultationRequest = (nutritionist: Nutritionist) => {
    if (!user) {
      // Redirect to login
      return;
    }
    
    if (!user.isPremium) {
      // Show upgrade prompt
      onUpgradeToPremium();
      return;
    }
    
    onSelectNutritionist(nutritionist);
  };

  const handleChatClick = (nutritionist: Nutritionist) => {
    if (!user) {
      // Redirect to login if no user
      return;
    }
    if (!user.isPremium) {
      // Show upgrade prompt for non-premium users
      onUpgradeToPremium();
      return;
    }
    onSelectNutritionist(nutritionist);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Users className="w-8 h-8 text-primary" />
          <h1 className="text-3xl">Verified Nutritionists</h1>
          <Crown className="w-6 h-6 text-amber-500" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with certified nutrition experts specializing in heart health. 
          Get personalized guidance from qualified professionals.
        </p>
        
        {!user?.isPremium && (
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <Crown className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-xl mb-2">Premium Feature</h3>
              <p className="text-muted-foreground mb-4">
                Upgrade to Premium to consult with verified nutritionists and get personalized care.
              </p>
              <Button onClick={onUpgradeToPremium} className="bg-primary hover:bg-primary/90">
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="Heart Health">Heart Health</SelectItem>
                <SelectItem value="Weight Management">Weight Management</SelectItem>
                <SelectItem value="Diabetes">Diabetes</SelectItem>
                <SelectItem value="Sports Nutrition">Sports Nutrition</SelectItem>
                <SelectItem value="Plant-based Nutrition">Plant-based</SelectItem>
                <SelectItem value="Clinical Nutrition">Clinical Nutrition</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Nutritionist Cards */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredNutritionists.map((nutritionist) => (
          <Card key={nutritionist.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={`/api/placeholder/64/64`} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {nutritionist.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{nutritionist.name}</h3>
                    {nutritionist.isVerified && (
                      <CheckCircle className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span>{nutritionist.rating}</span>
                    </div>
                    <div>{nutritionist.experience} years exp.</div>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${nutritionist.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span>{nutritionist.isOnline ? 'Online' : 'Offline'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span>${nutritionist.hourlyRate}/hour</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Specializations */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-1">
                    {nutritionist.specialization.map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Bio */}
                <div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {nutritionist.bio}
                  </p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="p-2 bg-secondary/30 rounded">
                    <div className="font-medium">{nutritionist.totalConsultations}</div>
                    <div className="text-xs text-muted-foreground">Consultations</div>
                  </div>
                  <div className="p-2 bg-secondary/30 rounded">
                    <div className="font-medium">{nutritionist.rating}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div className="p-2 bg-secondary/30 rounded">
                    <div className="font-medium">{nutritionist.experience}y</div>
                    <div className="text-xs text-muted-foreground">Experience</div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {/* View profile */}}
                  >
                    View Profile
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleConsultationRequest(nutritionist)}
                    disabled={!user}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {!user ? 'Login Required' : user.isPremium ? 'Start Chat' : 'Premium Only'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNutritionists.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Nutritionists Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find available nutritionists.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4>Verified Experts</h4>
            <p className="text-sm text-muted-foreground">
              All nutritionists are licensed and verified professionals
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4>Heart Health Focus</h4>
            <p className="text-sm text-muted-foreground">
              Specialized expertise in cardiovascular nutrition
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4>Real-time Support</h4>
            <p className="text-sm text-muted-foreground">
              Get immediate answers through our chat platform
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}