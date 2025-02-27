
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import ProgressBar from '@/components/ui/ProgressBar';
import UserAvatar from '@/components/ui/UserAvatar';
import { courses, userProgress, users } from '@/utils/mockData';
import { 
  Clock, 
  Users, 
  Star, 
  Calendar, 
  Video, 
  FileText, 
  CheckCircle, 
  PlayCircle, 
  PenSquare, 
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the course
  const course = courses.find(c => c.id === courseId);
  
  // Find instructor
  const instructor = users.find(user => user.id === course?.instructorId);
  
  // Find user progress for this course
  const progress = userProgress.find(p => p.courseId === courseId);
  
  // Redirect or show error if course doesn't exist
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <Button asChild>
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }
  
  // Calculate total duration
  const totalLessons = course.modules.reduce((total, module) => 
    total + module.lessons.length, 0
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button 
            asChild 
            variant="ghost" 
            className="mb-6 group animate-fade-in" 
            size="sm"
          >
            <Link to="/courses" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Courses
            </Link>
          </Button>
          
          {/* Course Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Course Image and Info */}
            <div className="lg:col-span-2 animate-fade-in">
              <div className="rounded-lg overflow-hidden mb-6 aspect-video">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{course.duration}</span>
                </div>
                
                {course.enrolled && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{course.enrolled} students</span>
                  </div>
                )}
                
                {course.rating && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span>{course.rating} (120 reviews)</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Last updated 2 months ago</span>
                </div>
              </div>
            </div>
            
            {/* Enrollment Card */}
            <div className="lg:col-span-1 animate-fade-in-up">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  {progress ? (
                    <>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Your Progress</h3>
                        <ProgressBar 
                          value={progress.percentComplete} 
                          max={100} 
                          className="mb-4"
                        />
                        <p className="text-sm text-muted-foreground">
                          {progress.completedLessons.length} of {totalLessons} lessons completed
                        </p>
                      </div>
                      
                      <div className="flex flex-col space-y-3">
                        <Button size="lg">
                          Continue Learning
                        </Button>
                        <Button variant="outline" size="lg">
                          Review Materials
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-1">Free</h3>
                        <p className="text-muted-foreground mb-4">Enroll now to track your progress</p>
                      </div>
                      
                      <Button size="lg" className="w-full">
                        Enroll Now
                      </Button>
                    </>
                  )}
                  
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium">This course includes:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{totalLessons} on-demand lessons</span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Downloadable resources</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Self-paced learning</span>
                      </li>
                      <li className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Access to discussion forums</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Course Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="animate-fade-in">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                <p className="mb-6 text-balance">
                  {course.description}
                </p>
                
                <p className="mb-6">
                  This comprehensive course is designed for both beginners and experienced learners. 
                  You'll gain practical skills that can be immediately applied to real-world projects. 
                  Through a combination of video lectures, hands-on exercises, and quizzes, 
                  you'll develop a deep understanding of the subject matter.
                </p>
                
                <h3 className="text-xl font-bold mb-3">What You'll Learn</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Master the fundamental concepts and principles</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Build real-world projects for your portfolio</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Understand best practices and industry standards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Solve complex problems with confidence</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Collaborate effectively with teams</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Stay up-to-date with emerging trends</span>
                  </li>
                </ul>
                
                <h3 className="text-xl font-bold mb-3">Requirements</h3>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  <li>Basic computer literacy</li>
                  <li>A computer with internet access</li>
                  <li>Enthusiasm and willingness to learn</li>
                </ul>
                
                <h3 className="text-xl font-bold mb-3">Who This Course is For</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Beginners looking to enter the field</li>
                  <li>Professionals seeking to enhance their skills</li>
                  <li>Career changers transitioning to a new role</li>
                  <li>Students supplementing their academic studies</li>
                </ul>
              </div>
            </TabsContent>
            
            {/* Curriculum Tab */}
            <TabsContent value="curriculum" className="animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    {course.modules.length} modules • {totalLessons} lessons • {course.duration}
                  </p>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {course.modules.map((module, index) => (
                    <AccordionItem key={module.id} value={module.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-start text-left">
                          <span className="font-medium">
                            Module {module.order}: {module.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 py-2">
                          {module.lessons.map((lesson) => (
                            <div key={lesson.id} className="flex items-center p-2 rounded-md hover:bg-secondary">
                              <div className="mr-3">
                                {lesson.type === 'video' && <PlayCircle className="h-5 w-5 text-primary" />}
                                {lesson.type === 'reading' && <FileText className="h-5 w-5 text-primary" />}
                                {lesson.type === 'quiz' && <PenSquare className="h-5 w-5 text-primary" />}
                                {lesson.type === 'assignment' && <PenSquare className="h-5 w-5 text-primary" />}
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center justify-between">
                                  <span className={`${lesson.completed ? 'text-muted-foreground' : ''}`}>{lesson.title}</span>
                                  <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                </div>
                              </div>
                              {lesson.completed && <CheckCircle className="h-4 w-4 text-green-500 ml-2" />}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
            
            {/* Instructor Tab */}
            <TabsContent value="instructor" className="animate-fade-in">
              {instructor && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Meet Your Instructor</h2>
                  
                  <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden shrink-0">
                      <img 
                        src={instructor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=random`} 
                        alt={instructor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{instructor.name}</h3>
                      <p className="text-muted-foreground mb-4">{instructor.role.charAt(0).toUpperCase() + instructor.role.slice(1)}</p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>4.8 Instructor Rating</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 text-muted-foreground mr-1" />
                          <span>255 Reviews</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-muted-foreground mr-1" />
                          <span>2,540 Students</span>
                        </div>
                      </div>
                      
                      <p className="mb-4">
                        Sarah is a seasoned instructor with over 10 years of experience in the field. 
                        She has worked with leading companies and has a passion for teaching complex 
                        concepts in an accessible and engaging way.
                      </p>
                      
                      <p>
                        Her teaching philosophy emphasizes practical applications and real-world examples, 
                        ensuring that students not only understand the theory but can also apply their 
                        knowledge effectively in professional settings.
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">Other Courses by {instructor.name}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses
                      .filter(c => c.instructorId === instructor.id && c.id !== course.id)
                      .slice(0, 3)
                      .map(relatedCourse => (
                        <CourseCard 
                          key={relatedCourse.id} 
                          course={relatedCourse} 
                          className="animate-scale-in" 
                        />
                      ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
