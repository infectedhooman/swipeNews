
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { askQuestion, QuestionAnswer } from '@/services/llmService';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Bot, Link } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface NewsChatProps {
  onClose: () => void;
}

const NewsChat = ({ onClose }: NewsChatProps) => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<QuestionAnswer[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const answer = await askQuestion({ question });
      setChatHistory([...chatHistory, answer]);
      setQuestion('');
    } catch (error) {
      console.error('Error asking question:', error);
      toast({
        title: "Failed to get an answer",
        description: "We couldn't process your question at this time.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 z-50 flex flex-col p-4">
      <Card className="w-full max-w-md mx-auto h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            <h2 className="text-xl font-bold">News Assistant</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            {chatHistory.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">
                <Bot className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>Ask me about the latest news or any topic you're interested in!</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setQuestion("What's happening in renewable energy this week?")}
                  >
                    Renewable energy news
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setQuestion("Explain why tech stocks are trending")}
                  >
                    Tech stocks
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {chatHistory.map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="font-medium text-sm">{item.question}</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <p className="text-sm">{item.answer}</p>
                      
                      {item.sources && item.sources.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-border text-xs">
                          <p className="font-medium mb-1">Sources:</p>
                          <ul className="space-y-1">
                            {item.sources.map((source, idx) => (
                              <li key={idx} className="flex items-center">
                                <Link className="h-3 w-3 mr-1" />
                                <a 
                                  href={source.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  {source.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
        
        <CardFooter>
          <form onSubmit={handleSubmit} className="w-full flex space-x-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about the news..."
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading || !question.trim()}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask"}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewsChat;
