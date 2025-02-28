
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
              Transformasi Pengalaman Belajar Anda
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              Selamat datang di Gilang LMS, sistem manajemen pembelajaran modern yang dirancang untuk meningkatkan perjalanan pendidikan Anda.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <Link to="/courses">Jelajahi Kursus</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Link to="/dashboard">Dasbor Saya</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Mengapa Memilih Gilang LMS?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border shadow-sm hover-lift animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Kursus Komprehensif</h3>
              <p className="text-muted-foreground">
                Akses berbagai kursus berkualitas tinggi yang dirancang oleh pakar industri untuk membantu Anda menguasai keterampilan baru.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-sm hover-lift animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Pelacakan Kemajuan</h3>
              <p className="text-muted-foreground">
                Pantau perjalanan belajar Anda dengan analitik terperinci dan lacak kemajuan Anda secara real-time.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-sm hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Diskusi Interaktif</h3>
              <p className="text-muted-foreground">
                Berinteraksi dengan instruktur dan rekan melalui forum dinamis kami untuk meningkatkan pengalaman belajar Anda.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Kursus Unggulan</h2>
            <Button asChild variant="ghost" className="group">
              <Link to="/courses" className="flex items-center">
                Lihat Semua 
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
              <div className="text-4xl font-bold mb-2">10.000+</div>
              <div className="text-muted-foreground">Siswa Terdaftar</div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-muted-foreground">Instruktur Ahli</div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-muted-foreground">Kursus Tersedia</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Apa Kata Siswa Kami</h2>
          
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
                  <p className="text-sm text-muted-foreground">Siswa Pengembangan Web</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Gilang LMS telah benar-benar mengubah pengalaman belajar saya. Kursus-kursusnya terstruktur dengan baik dan instrukturnya sangat berpengetahuan. Saya belajar lebih banyak dalam 3 bulan daripada yang saya lakukan dalam setahun belajar mandiri."
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
                  <p className="text-sm text-muted-foreground">Siswa Data Science</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Fitur pelacakan kemajuan sangat berharga dalam menjaga motivasi saya. Saya dapat dengan jelas melihat seberapa jauh saya telah berkembang dan apa yang masih perlu saya pelajari. Forum diskusi juga bagus untuk mendapatkan bantuan."
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
                  <p className="text-sm text-muted-foreground">Siswa Desain UX</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Sebagai seseorang yang beralih karir, Gilang LMS telah menjadi sumber yang luar biasa. Kursus-kursusnya komprehensif dan praktis, dan dukungan komunitasnya luar biasa. Saya sekarang merasa percaya diri dengan keterampilan baru saya."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 animate-fade-in">Siap Mulai Belajar?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Bergabunglah dengan ribuan siswa yang telah mengubah karir mereka dengan Gilang LMS
          </p>
          <Button asChild size="lg" variant="secondary" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/courses">Mulai Hari Ini</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
