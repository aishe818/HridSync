import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { User } from '../App';
import { 
  Users, 
  UserCheck, 
  Settings, 
  BarChart3, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Crown,
  Heart,
  MessageCircle,
  Stethoscope
} from 'lucide-react';

interface AdminPanelProps {
  user: User;
}

export function AdminPanel({ user }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    premiumUsers: 234,
    totalNutritionists: 12,
    activeConsultations: 45,
    monthlyRevenue: 12450
  };

  const recentUsers = [
    { id: '1', name: 'John Smith', email: 'john@example.com', role: 'user', status: 'active', joinDate: '2024-01-15', isPremium: false },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'user', status: 'active', joinDate: '2024-01-14', isPremium: true },
    { id: '3', name: 'Dr. Michael Chen', email: 'michael@example.com', role: 'nutritionist', status: 'active', joinDate: '2024-01-10', isPremium: false },
    { id: '4', name: 'Emily Davis', email: 'emily@example.com', role: 'user', status: 'inactive', joinDate: '2024-01-12', isPremium: false },
    { id: '5', name: 'Dr. Lisa Wilson', email: 'lisa@example.com', role: 'nutritionist', status: 'pending', joinDate: '2024-01-13', isPremium: false }
  ];

  const nutritionists = [
    { id: '1', name: 'Dr. Sarah Johnson', email: 'sarah@example.com', status: 'verified', specialization: 'Heart Health', consultations: 125, rating: 4.9, revenue: 2850 },
    { id: '2', name: 'Dr. Michael Chen', email: 'michael@example.com', status: 'verified', specialization: 'Sports Nutrition', consultations: 98, rating: 4.8, revenue: 2340 },
    { id: '3', name: 'Dr. Emily Rodriguez', email: 'emily@example.com', status: 'pending', specialization: 'Plant-based', consultations: 0, rating: 0, revenue: 0 },
    { id: '4', name: 'Dr. James Wilson', email: 'james@example.com', status: 'verified', specialization: 'Clinical Nutrition', consultations: 156, rating: 4.9, revenue: 3720 }
  ];

  const systemAlerts = [
    { type: 'warning', message: 'High server load detected', time: '5 min ago' },
    { type: 'info', message: 'New nutritionist application received', time: '1 hour ago' },
    { type: 'error', message: 'Payment processing error for user #1234', time: '2 hours ago' },
    { type: 'success', message: 'System backup completed successfully', time: '6 hours ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'verified':
        return 'bg-emerald-500';
      case 'pending':
        return 'bg-amber-500';
      case 'inactive':
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      default:
        return <Shield className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Doctor Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome, Dr. {user?.name} - Manage patients, consultations, and system overview
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Stethoscope className="w-3 h-3" />
            Doctor
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-xl">{stats.totalUsers}</div>
            <div className="text-xs text-muted-foreground">Total Users</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <UserCheck className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <div className="text-xl">{stats.activeUsers}</div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Crown className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <div className="text-xl">{stats.premiumUsers}</div>
            <div className="text-xs text-muted-foreground">Premium Users</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-xl">{stats.totalNutritionists}</div>
            <div className="text-xs text-muted-foreground">Nutritionists</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-xl">{stats.activeConsultations}</div>
            <div className="text-xs text-muted-foreground">Active Chats</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-xl">${stats.monthlyRevenue}</div>
            <div className="text-xs text-muted-foreground">Monthly Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <span className="text-sm">{alert.message}</span>
                </div>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="nutritionists">Nutritionists</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentUsers.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {user.isPremium && <Crown className="w-3 h-3 text-amber-500" />}
                        <Badge 
                          variant="secondary"
                          className={`text-white text-xs ${getStatusColor(user.status)}`}
                        >
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nutritionist Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nutritionists.filter(n => n.status === 'verified').map((nutritionist) => (
                    <div key={nutritionist.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{nutritionist.name}</div>
                        <div className="text-xs text-muted-foreground">{nutritionist.specialization}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">${nutritionist.revenue}</div>
                        <div className="text-xs text-muted-foreground">
                          {nutritionist.consultations} consultations
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={`text-white text-xs ${getStatusColor(user.status)}`}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {user.isPremium ? (
                          <Crown className="w-4 h-4 text-amber-500" />
                        ) : (
                          <span className="text-muted-foreground text-xs">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nutritionists Tab */}
        <TabsContent value="nutritionists" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Nutritionist Management</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Nutritionist
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nutritionist</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Consultations</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nutritionists.map((nutritionist) => (
                    <TableRow key={nutritionist.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {nutritionist.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{nutritionist.name}</div>
                            <div className="text-xs text-muted-foreground">{nutritionist.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {nutritionist.specialization}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={`text-white text-xs ${getStatusColor(nutritionist.status)}`}
                        >
                          {nutritionist.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {nutritionist.consultations}
                      </TableCell>
                      <TableCell className="text-sm">
                        {nutritionist.rating > 0 ? nutritionist.rating.toFixed(1) : '-'}
                      </TableCell>
                      <TableCell className="text-sm">
                        ${nutritionist.revenue}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                          {nutritionist.status === 'pending' && (
                            <>
                              <Button variant="ghost" size="sm" className="text-emerald-600">
                                <CheckCircle className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <XCircle className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">User Registration</h4>
                    <p className="text-sm text-muted-foreground">Allow new user registrations</p>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Premium Features</h4>
                    <p className="text-sm text-muted-foreground">Enable premium subscriptions</p>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">AI Assistant</h4>
                    <p className="text-sm text-muted-foreground">Enable AI chat functionality</p>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Send system notifications</p>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-secondary/30 rounded-lg">
                    <div className="text-2xl text-primary">{stats.totalUsers}</div>
                    <div className="text-sm text-muted-foreground">Total Users</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/30 rounded-lg">
                    <div className="text-2xl text-primary">{stats.totalNutritionists}</div>
                    <div className="text-sm text-muted-foreground">Nutritionists</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/30 rounded-lg">
                    <div className="text-2xl text-primary">98.5%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/30 rounded-lg">
                    <div className="text-2xl text-primary">2.3GB</div>
                    <div className="text-sm text-muted-foreground">Storage Used</div>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}