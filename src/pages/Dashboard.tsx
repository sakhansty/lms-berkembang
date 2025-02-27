
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressBar from '@/components/ui/ProgressBar';
import UserAvatar from '@/components/ui/UserAvatar';
import { currentUser, courses, userProgress } from '@/utils/mockData';
import { BookOpen, Clock, CheckCircle, ArrowRight, CalendarDays } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Calculate recent courses based on progress
  const recentCourses = userProgress
    .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
    .slice(0, 4)
    .map(progress => {
      const course = courses.find(c => c.id === progress.courseId);
      return {
        ...course,
        progress: progress.percentComplete,
        lastAccessed: progress.lastAccessed
      };
    });
  
  // Calculate completion metrics
  const totalLessons = courses.reduce((acc, course) => {
    return acc + course.modules.reduce((modAcc, mod) => modAcc + mod.lessons.length, 0);
  }, 0);
  
  const completedLessons = userProgress.reduce((acc, progress) => {
    return acc + progress.completedLessons.length;
  }, 0);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Selamat Datang, {currentUser.name}</h1>
            <p className="text-muted-foreground">
              Lacak kemajuan Anda dan lanjutkan pembelajaran dari tempat Anda sebelumnya.
            </p>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8 animate-fade-in-up">
            <TabsList>
              <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
              <TabsTrigger value="courses">Kursus Saya</TabsTrigger>
              <TabsTrigger value="achievements">Pencapaian</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Kursus dalam Progres</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{userProgress.length}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Dari {courses.length} kursus yang tersedia
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Pelajaran Selesai</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{completedLessons}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Dari {totalLessons} total pelajaran
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Progres Keseluruhan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%
                    </div>
                    <ProgressBar 
                      value={completedLessons} 
                      max={totalLessons} 
                      showValue={false} 
                      className="mt-2"
                    />
                  </CardContent>
                </Card>
              </div>
              
              {/* Continue Learning */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Lanjutkan Pembelajaran</h2>
                  <Button asChild variant="ghost" size="sm" className="group">
                    <Link to="/courses" className="flex items-center">
                      Lihat Semua 
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentCourses.slice(0, 2).map((course, index) => (
                    <Card key={course?.id} className="overflow-hidden hover-lift">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 aspect-video md:aspect-auto">
                          <img 
                            src={course?.thumbnail} 
                            alt={course?.title} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5 md:w-2/3 flex flex-col">
                          <h3 className="font-medium mb-2 line-clamp-1">{course?.title}</h3>
                          
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Terakhir diakses: {new Date(course?.lastAccessed).toLocaleDateString()}</span>
                          </div>
                          
                          <ProgressBar 
                            value={course?.progress || 0} 
                            max={100} 
                            size="sm"
                            className="mb-4"
                          />
                          
                          <div className="mt-auto">
                            <Button asChild>
                              <Link to={`/courses/${course?.id}`}>Lanjutkan</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-xl font-semibold mb-6">Aktivitas Terbaru</h2>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="min-w-8 mt-1">
                          <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Menyelesaikan pelajaran "Struktur HTML"</p>
                          <p className="text-sm text-muted-foreground mt-1">Pengantar Pengembangan Web</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-2">
                            <CalendarDays className="h-3 w-3 mr-1" />
                            <span>2 hari yang lalu</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="min-w-8 mt-1">
                          <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Memulai kursus "Data Science Lanjutan"</p>
                          <p className="text-sm text-muted-foreground mt-1">Mendaftar kursus baru</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-2">
                            <CalendarDays className="h-3 w-3 mr-1" />
                            <span>5 hari yang lalu</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="min-w-8 mt-1">
                          <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Menyelesaikan pelajaran "Pengantar HTML"</p>
                          <p className="text-sm text-muted-foreground mt-1">Pengantar Pengembangan Web</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-2">
                            <CalendarDays className="h-3 w-3 mr-1" />
                            <span>1 minggu yang lalu</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* My Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                {userProgress.map((progress, index) => {
                  const course = courses.find(c => c.id === progress.courseId);
                  return (
                    <Card key={course?.id} className="overflow-hidden hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="aspect-video">
                        <img 
                          src={course?.thumbnail} 
                          alt={course?.title} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-medium mb-2">{course?.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{course?.duration}</span>
                        </div>
                        
                        <ProgressBar 
                          value={progress.percentComplete} 
                          max={100} 
                          className="mb-4"
                        />
                        
                        <Button asChild>
                          <Link to={`/courses/${course?.id}`}>
                            {progress.percentComplete > 0 ? 'Lanjutkan' : 'Mulai Belajar'}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {/* Explore More Courses */}
              <Card className="p-6 text-center bg-secondary animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-xl font-medium mb-2">Mencari kursus lainnya?</h3>
                <p className="text-muted-foreground mb-4">
                  Jelajahi katalog kami untuk menemukan perjalanan pembelajaran berikutnya.
                </p>
                <Button asChild>
                  <Link to="/courses">Jelajahi Semua Kursus</Link>
                </Button>
              </Card>
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                <Card className="text-center p-6 hover-lift">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Kursus Pertama Dimulai</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Memulai perjalanan belajar Anda
                  </p>
                  <div className="text-xs bg-secondary rounded-full px-2 py-1 inline-block">
                    Diperoleh 5 hari yang lalu
                  </div>
                </Card>
                
                <Card className="text-center p-6 hover-lift">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Pelajaran Pertama Selesai</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Menyelesaikan pelajaran pertama Anda
                  </p>
                  <div className="text-xs bg-secondary rounded-full px-2 py-1 inline-block">
                    Diperoleh 4 hari yang lalu
                  </div>
                </Card>
                
                <Card className="text-center p-6 border-dashed hover-lift">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-1">Kuis Pertama Dikuasai</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Skor 100% pada kuis
                  </p>
                  <div className="text-xs bg-secondary rounded-full px-2 py-1 inline-block">
                    Terkunci
                  </div>
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

export default Dashboard;
