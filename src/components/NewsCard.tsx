
import { useState } from 'react';
import { Article } from '@/services/newsService';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NewsCardProps {
  article: Article;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const NewsCard = ({ article, onSwipeLeft, onSwipeRight }: NewsCardProps) => {
  const [swiping, setSwiping] = useState<'left' | 'right' | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX;
    
    // Determine swipe direction with at least 50px movement
    if (Math.abs(diff) > 50) {
      if (diff > 0 && swiping !== 'right') {
        setSwiping('right');
      } else if (diff < 0 && swiping !== 'left') {
        setSwiping('left');
      }
    } else {
      setSwiping(null);
    }
  };

  const handleTouchEnd = () => {
    if (swiping === 'left') {
      onSwipeLeft();
    } else if (swiping === 'right') {
      onSwipeRight();
    }
    
    setTouchStartX(null);
    // Don't reset swiping state here so animation can complete
  };

  const handleSwipeLeft = () => {
    setSwiping('left');
    setTimeout(() => {
      onSwipeLeft();
    }, 300);
  };

  const handleSwipeRight = () => {
    setSwiping('right');
    setTimeout(() => {
      onSwipeRight();
    }, 300);
  };

  const timeAgo = article.publishedAt 
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : '';

  return (
    <Card 
      className={`w-full max-w-md mx-auto overflow-hidden shadow-lg transition-all duration-300 transform
        ${swiping === 'left' ? 'animate-swipe-left' : ''}
        ${swiping === 'right' ? 'animate-swipe-right' : ''}
        ${!swiping ? 'animate-card-in' : ''}
      `}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {article.urlToImage ? (
        <div className="w-full h-64 overflow-hidden">
          <img 
            src={article.urlToImage} 
            alt={article.title} 
            className="w-full h-full object-cover" 
          />
        </div>
      ) : (
        <div className="w-full h-64 bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">No image available</p>
        </div>
      )}
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="bg-primary/10">
            {article.source.name}
          </Badge>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
        
        <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
        
        {article.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {article.description}
          </p>
        )}
        
        <div className="flex justify-between mt-4">
          <button 
            onClick={handleSwipeLeft}
            className="p-3 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
            aria-label="Dismiss"
          >
            <X size={24} />
          </button>
          
          <button 
            onClick={handleSwipeRight}
            className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label="Save"
          >
            <Heart size={24} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
