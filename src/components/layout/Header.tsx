
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  BarChart, 
  MessageSquare, 
  Home, 
  Menu, 
  X,
  User,
  LogOut
} from 'lucide-react';
import { currentUser } from '@/utils/mockData';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 animate-fade-in">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">LMS Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md transition-all ${
                isActive('/') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              }`}
            >
              <span className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </span>
            </Link>
            <Link 
              to="/dashboard" 
              className={`px-3 py-2 rounded-md transition-all ${
                isActive('/dashboard') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              }`}
            >
              <span className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </span>
            </Link>
            <Link 
              to="/courses" 
              className={`px-3 py-2 rounded-md transition-all ${
                isActive('/courses') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              }`}
            >
              <span className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Courses</span>
              </span>
            </Link>
            <Link 
              to="/forum" 
              className={`px-3 py-2 rounded-md transition-all ${
                isActive('/forum') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              }`}
            >
              <span className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Forum</span>
              </span>
            </Link>
            <Link 
              to="/analytics" 
              className={`px-3 py-2 rounded-md transition-all ${
                isActive('/analytics') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              }`}
            >
              <span className="flex items-center space-x-2">
                <BarChart className="h-4 w-4" />
                <span>Analytics</span>
              </span>
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 hover-lift">
                  <div className="w-8 h-8 rounded-full overflow-hidden border">
                    <img 
                      src={currentUser.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentUser.name)} 
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="hidden sm:inline-block">{currentUser.name}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-background border-b animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              }`}
            >
              <span className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </span>
            </Link>
            <Link 
              to="/dashboard" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/dashboard') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              }`}
            >
              <span className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </span>
            </Link>
            <Link 
              to="/courses" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/courses') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              }`}
            >
              <span className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Courses</span>
              </span>
            </Link>
            <Link 
              to="/forum" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/forum') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              }`}
            >
              <span className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Forum</span>
              </span>
            </Link>
            <Link 
              to="/analytics" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/analytics') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              }`}
            >
              <span className="flex items-center space-x-2">
                <BarChart className="h-4 w-4" />
                <span>Analytics</span>
              </span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
