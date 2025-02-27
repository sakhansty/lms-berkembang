
import { User, Course, Progress, ForumThread, AnalyticsData } from './types';

export const currentUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

export const users: User[] = [
  currentUser,
  {
    id: 'user2',
    name: 'Sarah Miller',
    email: 'sarah@example.com',
    role: 'instructor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export const courses: Course[] = [
  {
    id: 'course1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development, including HTML, CSS, and JavaScript. Build responsive websites from scratch.',
    thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    instructorId: 'user2',
    instructorName: 'Sarah Miller',
    duration: '6 weeks',
    enrolled: 245,
    rating: 4.7,
    modules: [
      {
        id: 'module1',
        title: 'HTML Fundamentals',
        order: 1,
        lessons: [
          {
            id: 'lesson1',
            title: 'Introduction to HTML',
            type: 'video',
            duration: '15 min',
            completed: true
          },
          {
            id: 'lesson2',
            title: 'HTML Structure',
            type: 'reading',
            duration: '20 min',
            completed: true
          },
          {
            id: 'lesson3',
            title: 'HTML Elements Quiz',
            type: 'quiz',
            duration: '10 min',
            completed: false
          }
        ]
      },
      {
        id: 'module2',
        title: 'CSS Basics',
        order: 2,
        lessons: [
          {
            id: 'lesson4',
            title: 'Introduction to CSS',
            type: 'video',
            duration: '18 min',
            completed: false
          },
          {
            id: 'lesson5',
            title: 'CSS Selectors',
            type: 'reading',
            duration: '25 min',
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'course2',
    title: 'Advanced Data Science',
    description: 'Master advanced data science concepts including machine learning, statistical analysis, and data visualization.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    instructorId: 'user2',
    instructorName: 'Sarah Miller',
    duration: '8 weeks',
    enrolled: 182,
    rating: 4.9,
    modules: [
      {
        id: 'module1',
        title: 'Statistical Analysis',
        order: 1,
        lessons: [
          {
            id: 'lesson1',
            title: 'Introduction to Statistics',
            type: 'video',
            duration: '22 min',
            completed: false
          },
          {
            id: 'lesson2',
            title: 'Statistical Methods',
            type: 'reading',
            duration: '35 min',
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'course3',
    title: 'Artificial Intelligence Foundations',
    description: 'Understand the core principles and applications of artificial intelligence in today\'s digital landscape.',
    thumbnail: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    instructorId: 'user2',
    instructorName: 'Sarah Miller',
    duration: '10 weeks',
    enrolled: 320,
    rating: 4.8,
    modules: [
      {
        id: 'module1',
        title: 'AI Fundamentals',
        order: 1,
        lessons: [
          {
            id: 'lesson1',
            title: 'What is AI?',
            type: 'video',
            duration: '20 min',
            completed: false
          }
        ]
      }
    ]
  }
];

export const userProgress: Progress[] = [
  {
    userId: 'user1',
    courseId: 'course1',
    completedLessons: ['lesson1', 'lesson2'],
    percentComplete: 40,
    lastAccessed: '2023-06-15T10:30:00Z'
  },
  {
    userId: 'user1',
    courseId: 'course2',
    completedLessons: [],
    percentComplete: 0,
    lastAccessed: '2023-06-10T14:20:00Z'
  }
];

export const forumThreads: ForumThread[] = [
  {
    id: 'thread1',
    title: 'Help with CSS Flexbox',
    authorId: 'user1',
    authorName: 'Alex Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: '2023-06-14T09:15:00Z',
    content: 'I\'m having trouble understanding how to center elements vertically using CSS Flexbox. Can someone explain this to me?',
    courseId: 'course1',
    replies: [
      {
        id: 'reply1',
        authorId: 'user2',
        authorName: 'Sarah Miller',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: '2023-06-14T10:20:00Z',
        content: 'To center elements vertically with Flexbox, set display: flex and align-items: center on the parent container. This will align all children vertically within that container.'
      }
    ]
  },
  {
    id: 'thread2',
    title: 'Best resources for learning Python?',
    authorId: 'user3',
    authorName: 'Michael Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: '2023-06-13T15:45:00Z',
    content: 'I\'m looking for recommendations on the best books or online resources for learning Python from scratch.',
    replies: [
      {
        id: 'reply1',
        authorId: 'user2',
        authorName: 'Sarah Miller',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: '2023-06-13T16:30:00Z',
        content: 'I highly recommend "Automate the Boring Stuff with Python" by Al Sweigart. It\'s available online for free and is perfect for beginners.'
      }
    ]
  }
];

export const analyticsData: AnalyticsData = {
  activeCourses: 3,
  activeStudents: 245,
  completionRate: 68,
  popularCourses: [
    {
      courseId: 'course3',
      courseTitle: 'Artificial Intelligence Foundations',
      enrollments: 320
    },
    {
      courseId: 'course1',
      courseTitle: 'Introduction to Web Development',
      enrollments: 245
    },
    {
      courseId: 'course2',
      courseTitle: 'Advanced Data Science',
      enrollments: 182
    }
  ],
  recentActivity: [
    {
      type: 'enrollment',
      userId: 'user1',
      userName: 'Alex Johnson',
      courseId: 'course1',
      courseTitle: 'Introduction to Web Development',
      date: '2023-06-15T10:20:00Z'
    },
    {
      type: 'completion',
      userId: 'user1',
      userName: 'Alex Johnson',
      courseId: 'course1',
      courseTitle: 'Introduction to Web Development',
      date: '2023-06-14T14:35:00Z'
    },
    {
      type: 'forum',
      userId: 'user1',
      userName: 'Alex Johnson',
      date: '2023-06-14T09:15:00Z'
    }
  ]
};
