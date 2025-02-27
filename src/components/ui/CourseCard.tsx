
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import { Course } from '@/utils/types';
import { CSSProperties } from 'react';

interface CourseCardProps {
  course: Course;
  className?: string;
  style?: CSSProperties;
}

const CourseCard = ({ course, className = '', style }: CourseCardProps) => {
  return (
    <Link 
      to={`/courses/${course.id}`} 
      className={`group block rounded-lg overflow-hidden border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
      style={style}
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white font-medium">Lihat Kursus</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{course.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          
          {course.enrolled && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.enrolled} siswa</span>
            </div>
          )}
          
          {course.rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{course.rating}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
