
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import UserAvatar from '@/components/ui/UserAvatar';
import { forumThreads, users, currentUser } from '@/utils/mockData';
import { Search, MessageSquare, PlusCircle, Clock, RefreshCw } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Forum = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  
  // Filter threads based on search query and active tab
  const filteredThreads = forumThreads.filter(thread => {
    const matchesSearch = 
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearch;
    } else if (activeTab === 'my-threads') {
      return matchesSearch && thread.authorId === currentUser.id;
    } else if (activeTab === 'unanswered') {
      return matchesSearch && thread.replies.length === 0;
    }
    
    return matchesSearch;
  });
  
  const handleCreateThread = () => {
    // This would normally save the new thread to a database
    console.log('Creating new thread:', { title: newThreadTitle, content: newThreadContent });
    
    // Clear form and close dialog
    setNewThreadTitle('');
    setNewThreadContent('');
    setDialogOpen(false);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Discussion Forum</h1>
            <p className="text-muted-foreground">
              Connect with other students and instructors to discuss course content, ask questions, and share insights.
            </p>
          </div>
          
          {/* Search and Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 animate-fade-in-up">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="whitespace-nowrap">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Discussion
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Start a New Discussion</DialogTitle>
                  <DialogDescription>
                    Create a new thread to ask questions or share insights with the community.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium leading-none">
                      Title
                    </label>
                    <Input
                      id="title"
                      placeholder="Enter a descriptive title"
                      value={newThreadTitle}
                      onChange={(e) => setNewThreadTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium leading-none">
                      Content
                    </label>
                    <Textarea
                      id="content"
                      placeholder="Describe your question or discussion topic in detail"
                      rows={6}
                      value={newThreadContent}
                      onChange={(e) => setNewThreadContent(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateThread} disabled={!newThreadTitle || !newThreadContent}>
                    Post Discussion
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Forum Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Discussions</TabsTrigger>
              <TabsTrigger value="my-threads">My Discussions</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="animate-fade-in">
              {renderThreads(filteredThreads)}
            </TabsContent>
            
            <TabsContent value="my-threads" className="animate-fade-in">
              {renderThreads(filteredThreads)}
            </TabsContent>
            
            <TabsContent value="unanswered" className="animate-fade-in">
              {renderThreads(filteredThreads)}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
  
  function renderThreads(threads: typeof forumThreads) {
    if (threads.length === 0) {
      return (
        <div className="text-center py-16">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No discussions found</h3>
          <p className="text-muted-foreground mb-6">
            {activeTab === 'my-threads' 
              ? "You haven't started any discussions yet."
              : activeTab === 'unanswered'
                ? "There are no unanswered discussions."
                : "No discussions match your search criteria."}
          </p>
          <Button onClick={() => {
            setSearchQuery('');
            setDialogOpen(true);
          }}>
            Start a New Discussion
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        {threads.map((thread, index) => (
          <Card key={thread.id} className="hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <UserAvatar 
                    user={users.find(u => u.id === thread.authorId) || {
                      id: thread.authorId,
                      name: thread.authorName,
                      email: '',
                      role: 'student',
                      avatar: thread.authorAvatar
                    }}
                    size="md"
                  />
                  <div>
                    <h3 className="font-medium">{thread.authorName}</h3>
                    <p className="text-xs text-muted-foreground">
                      Posted on {formatDate(thread.date)}
                    </p>
                  </div>
                </div>
                
                {thread.courseId && (
                  <Link
                    to={`/courses/${thread.courseId}`}
                    className="text-xs bg-secondary hover:bg-secondary/80 px-2 py-1 rounded-full"
                  >
                    Course Discussion
                  </Link>
                )}
              </div>
              <CardTitle className="mt-4 text-xl">
                <Link to={`/forum/${thread.id}`} className="hover:underline">
                  {thread.title}
                </Link>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pb-3">
              <p className="text-muted-foreground line-clamp-3">
                {thread.content}
              </p>
            </CardContent>
            
            <CardFooter className="pt-2 border-t flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{thread.replies.length} {thread.replies.length === 1 ? 'reply' : 'replies'}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>
                    {thread.replies.length > 0 
                      ? `Last reply ${formatDate(thread.replies[thread.replies.length - 1].date)}`
                      : 'No replies yet'}
                  </span>
                </div>
              </div>
              
              <Button asChild variant="ghost" size="sm">
                <Link to={`/forum/${thread.id}`}>
                  View Discussion
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
};

export default Forum;
