
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { analyticsData, courses } from '@/utils/mockData';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon,
  Users, 
  GraduationCap, 
  ArrowUpRight, 
  ArrowDownRight,
  BookOpen
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Prepare data for charts
  const courseEnrollmentData = analyticsData.popularCourses.map(course => ({
    name: course.courseTitle.length > 20 
      ? course.courseTitle.substring(0, 20) + '...' 
      : course.courseTitle,
    enrollments: course.enrollments
  }));
  
  // Mock data for completion rate trend
  const completionTrend = [
    { month: 'Jan', rate: 45 },
    { month: 'Feb', rate: 52 },
    { month: 'Mar', rate: 49 },
    { month: 'Apr', rate: 55 },
    { month: 'May', rate: 59 },
    { month: 'Jun', rate: 63 },
    { month: 'Jul', rate: 68 },
  ];
  
  // Mock data for course category distribution
  const categoryDistribution = [
    { name: 'Web Dev', value: 35 },
    { name: 'Data Science', value: 25 },
    { name: 'AI', value: 20 },
    { name: 'Design', value: 15 },
    { name: 'Business', value: 5 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor platform performance and track educational metrics.
            </p>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in-up">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{analyticsData.activeStudents}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                      <span className="text-green-500 font-medium">12%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{analyticsData.activeCourses}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                      <span className="text-green-500 font-medium">3%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{analyticsData.completionRate}%</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                      <span className="text-green-500 font-medium">5%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Session Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">42m</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center">
                      <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                      <span className="text-red-500 font-medium">3%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in-up">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Course Enrollments */}
                <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <CardHeader>
                    <CardTitle>Course Enrollments</CardTitle>
                    <CardDescription>Top courses by student enrollment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={courseEnrollmentData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="enrollments" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Completion Rate Trend */}
                <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <CardHeader>
                    <CardTitle>Completion Rate Trend</CardTitle>
                    <CardDescription>Course completion rate over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={completionTrend}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="rate" 
                            stroke="#8884d8" 
                            strokeWidth={2}
                            activeDot={{ r: 8 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Course Category Distribution */}
                <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <CardHeader>
                    <CardTitle>Course Categories</CardTitle>
                    <CardDescription>Distribution by subject area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recent Activity */}
                <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest platform events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      {analyticsData.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start">
                          <div className="min-w-8 mt-1">
                            <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center">
                              {activity.type === 'enrollment' && <Users className="h-4 w-4 text-primary" />}
                              {activity.type === 'completion' && <GraduationCap className="h-4 w-4 text-primary" />}
                              {activity.type === 'forum' && <BookOpen className="h-4 w-4 text-primary" />}
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">
                              {activity.userName} 
                              {activity.type === 'enrollment' && ' enrolled in '}
                              {activity.type === 'completion' && ' completed '}
                              {activity.type === 'forum' && ' posted in the forum'}
                              {activity.courseTitle && activity.courseTitle}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(activity.date).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Engagement Tab */}
            <TabsContent value="engagement" className="animate-fade-in">
              <div className="grid grid-cols-1 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Engagement</CardTitle>
                    <CardDescription>Weekly active users and session metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground my-16">
                      Detailed engagement analytics will be available in a future update.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Courses Tab */}
            <TabsContent value="courses" className="animate-fade-in">
              <div className="grid grid-cols-1 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Performance</CardTitle>
                    <CardDescription>Detailed metrics by course</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground my-16">
                      Detailed course analytics will be available in a future update.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
