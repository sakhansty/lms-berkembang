
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import UserAvatar from '@/components/ui/UserAvatar';
import { forumThreads, users, currentUser } from '@/utils/mockData';
import { ArrowLeft, MessageSquare, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';

const ThreadDetail = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [replyContent, setReplyContent] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the thread
  const thread = forumThreads.find(t => t.id === threadId);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  // Handle submit reply
  const handleSubmitReply = () => {
    if (!replyContent.trim()) return;
    
    // In a real app, this would save to the database
    console.log('Submitting reply:', { threadId, content: replyContent });
    
    toast({
      title: "Balasan diposting",
      description: "Tanggapan Anda telah berhasil dikirim",
    });
    
    // Clear input
    setReplyContent('');
  };
  
  // If thread doesn't exist, show error
  if (!thread) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-4">Diskusi tidak ditemukan</h1>
            <p className="text-muted-foreground mb-8">
              Diskusi yang Anda cari tidak ada atau telah dihapus.
            </p>
            <Button asChild>
              <Link to="/forum">Kembali ke Forum</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
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
            <Link to="/forum" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Kembali ke Forum
            </Link>
          </Button>
          
          {/* Thread Details */}
          <div className="mb-8 animate-fade-in">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-4 mb-4">
                  <UserAvatar 
                    user={users.find(u => u.id === thread.authorId) || {
                      id: thread.authorId,
                      name: thread.authorName,
                      email: '',
                      role: 'student',
                      avatar: thread.authorAvatar
                    }}
                    size="lg"
                  />
                  <div>
                    <h3 className="font-medium">{thread.authorName}</h3>
                    <p className="text-xs text-muted-foreground">
                      Diposting pada {formatDate(thread.date)}
                    </p>
                    {thread.courseId && (
                      <Link
                        to={`/courses/${thread.courseId}`}
                        className="text-xs bg-secondary hover:bg-secondary/80 px-2 py-1 mt-1 inline-block rounded-full"
                      >
                        Diskusi Kursus
                      </Link>
                    )}
                  </div>
                </div>
                <CardTitle className="text-2xl">{thread.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none mb-6">
                  <p>{thread.content}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Replies */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-bold mb-4">
              Balasan ({thread.replies.length})
            </h2>
            
            {thread.replies.length > 0 ? (
              <div className="space-y-6">
                {thread.replies.map((reply, index) => (
                  <Card key={reply.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05 + 0.2}s` }}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <UserAvatar 
                          user={users.find(u => u.id === reply.authorId) || {
                            id: reply.authorId,
                            name: reply.authorName,
                            email: '',
                            role: 'student',
                            avatar: reply.authorAvatar
                          }}
                          size="md"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{reply.authorName}</h3>
                              <p className="text-xs text-muted-foreground">
                                Dibalas pada {formatDate(reply.date)}
                              </p>
                            </div>
                          </div>
                          <p className="text-muted-foreground">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto opacity-50 mb-4" />
                <p className="mb-2">Belum ada balasan</p>
                <p className="text-sm">Jadilah yang pertama membalas diskusi ini</p>
              </Card>
            )}
          </div>
          
          {/* Post Reply */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl font-bold mb-4">Kirim Balasan</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <UserAvatar 
                    user={currentUser}
                    size="md"
                  />
                  <div className="flex-1 space-y-4">
                    <Textarea
                      placeholder="Bagikan pemikiran Anda atau berikan jawaban..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={5}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleSubmitReply} disabled={!replyContent.trim()}>
                        Kirim Balasan
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThreadDetail;
