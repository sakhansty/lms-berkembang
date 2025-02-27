
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { courses } from '@/utils/mockData';
import CourseCard from '@/components/ui/CourseCard';
import { ArrowRight, BookOpen, Users, BarChart, MessageSquare, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Transform Your Learning Experience
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              Welcome to LMS Pro, the modern learning management system designed to enhance your educational journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <Link to="/courses">Browse Courses</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Link to="/dashboard">My Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose LMS Pro?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border shadow-sm hover-lift animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Comprehensive Courses</h3>
              <p className="text-muted-foreground">
                Access a wide range of high-quality courses designed by industry experts to help you master new skills.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-sm hover-lift animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your learning journey with detailed analytics and track your progress in real-time.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-sm hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Interactive Discussions</h3>
              <p className="text-muted-foreground">
                Engage with instructors and peers through our dynamic forums to enhance your learning experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Button asChild variant="ghost" className="group">
              <Link to="/courses" className="flex items-center">
                View All 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Statistics */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-muted-foreground">Students Enrolled</div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-muted-foreground">Expert Instructors</div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-muted-foreground">Courses Available</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border shadow-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Student"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Emily Johnson</h4>
                  <p className="text-sm text-muted-foreground">Web Development Student</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "LMS Pro has completely transformed my learning experience. The courses are well-structured and the instructors are incredibly knowledgeable. I've learned more in 3 months than I did in a year of self-study."
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Student"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-medium">David Chen</h4>
                  <p className="text-sm text-muted-foreground">Data Science Student</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The progress tracking features have been invaluable in keeping me motivated. I can clearly see how far I've come and what I still need to learn. The discussion forums are also great for getting help."
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Student"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Sarah Miller</h4>
                  <p className="text-sm text-muted-foreground">UX Design Student</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "As someone transitioning careers, LMS Pro has been an incredible resource. The courses are comprehensive and practical, and the community support has been amazing. I now feel confident in my new skills."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 animate-fade-in">Ready to Start Learning?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Join thousands of students who are already transforming their careers with LMS Pro
          </p>
          <Button asChild size="lg" variant="secondary" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/courses">Get Started Today</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
