
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CourseCard from '@/components/ui/CourseCard';
import { courses } from '@/utils/mockData';
import { Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  
  // Filter and sort courses
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.enrolled || 0) - (a.enrolled || 0);
    } else if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    } else {
      return a.title.localeCompare(b.title);
    }
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Jelajahi Kursus Kami</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Temukan berbagai kursus yang dirancang untuk membantu Anda menguasai keterampilan baru dan mengembangkan karir Anda.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Cari kursus..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="web">Pengembangan Web</SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                    <SelectItem value="ai">Kecerdasan Buatan</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Urutkan berdasarkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Paling Populer</SelectItem>
                    <SelectItem value="rating">Penilaian Tertinggi</SelectItem>
                    <SelectItem value="title">Alfabet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Courses Grid */}
          {sortedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {sortedCourses.map((course, index) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  className="animate-scale-in" 
                  style={{ animationDelay: `${index * 0.05 + 0.1}s` }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-xl font-medium mb-2">Tidak ada kursus yang ditemukan</h3>
              <p className="text-muted-foreground mb-4">
                Coba sesuaikan kriteria pencarian Anda atau jelajahi penawaran kami yang lain.
              </p>
              <Button onClick={() => setSearchQuery('')}>Hapus Pencarian</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
