
export type UserRole = 'admin' | 'instructor' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorId: string;
  instructorName: string;
  duration: string;
  modules: Module[];
  enrolled?: number;
  rating?: number;
}

export interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  duration: string;
  completed?: boolean;
  content?: string;
}

export interface Progress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  percentComplete: number;
  lastAccessed: string;
}

export interface ForumThread {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  date: string;
  content: string;
  replies: ForumReply[];
  courseId?: string;
}

export interface ForumReply {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  date: string;
  content: string;
}

export interface AnalyticsData {
  activeCourses: number;
  activeStudents: number;
  completionRate: number;
  popularCourses: {
    courseId: string;
    courseTitle: string;
    enrollments: number;
  }[];
  recentActivity: {
    type: 'enrollment' | 'completion' | 'forum';
    userId: string;
    userName: string;
    courseId?: string;
    courseTitle?: string;
    date: string;
  }[];
}
