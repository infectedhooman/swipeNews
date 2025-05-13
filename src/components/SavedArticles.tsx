
import { Article } from '@/services/newsService';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SavedArticlesProps {
  articles: Article[];
  onRemove: (articleUrl: string) => void;
  onClose: () => void;
}

const SavedArticles = ({ articles, onRemove, onClose }: SavedArticlesProps) => {
  if (articles.length === 0) {
    return (
      <div className="fixed inset-0 bg-background/95 z-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Saved Articles</h2>
        <p className="text-muted-foreground mb-6">You haven't saved any articles yet.</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/95 z-50 flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Saved Articles</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {articles.map((article) => (
            <div 
              key={article.url} 
              className="flex items-start space-x-4 p-4 bg-card rounded-lg shadow-sm"
            >
              {article.urlToImage && (
                <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
                  <img 
                    src={article.urlToImage} 
                    alt={article.title}
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium line-clamp-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {article.source.name}
                </p>
                <div className="mt-2 flex">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mr-4"
                  >
                    Read Article
                  </a>
                  <button 
                    onClick={() => onRemove(article.url)}
                    className="text-sm text-destructive hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SavedArticles;
