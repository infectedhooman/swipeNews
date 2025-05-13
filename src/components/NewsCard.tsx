
import { useState, useEffect } from 'react';
import { Article } from '@/services/newsService';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, X, Bot, FileText, Check, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import ArticleSummary from './ArticleSummary';
import { analyzeArticle, ArticleAnalysis } from '@/services/llmService';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface NewsCardProps {
  article: Article;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onOpenChat: () => void;
}

const NewsCard = ({ article, onSwipeLeft, onSwipeRight, onOpenChat }: NewsCardProps) => {
  const [swiping, setSwiping] = useState<'left' | 'right' | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [analysis, setAnalysis] = useState<ArticleAnalysis | null>(null);
  const [showFactCheck, setShowFactCheck] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const result = await analyzeArticle(article);
        setAnalysis(result);
      } catch (error) {
        console.error('Failed to analyze article:', error);
      }
    };

    fetchAnalysis();
  }, [article]);

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
          <span className="text-xs text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {timeAgo}
          </span>
        </div>
        
        <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
        
        {/* AI-generated tags */}
        {analysis && analysis.tags && analysis.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {analysis.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {article.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {article.description}
          </p>
        )}

        {/* AI features section */}
        <div className="border-t border-border pt-3 mb-3 flex items-center justify-between">
          <div className="flex space-x-2">
            {/* Summary button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setShowSummary(!showSummary)}
                >
                  <FileText className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get summary</p>
              </TooltipContent>
            </Tooltip>
            
            {/* Chat button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onOpenChat}
                >
                  <Bot className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ask about this</p>
              </TooltipContent>
            </Tooltip>
            
            {/* Fact check button */}
            {analysis?.factCheck && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setShowFactCheck(!showFactCheck)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fact check</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          
          {/* Keywords/hashtags */}
          {analysis?.keywords && (
            <div className="text-xs text-muted-foreground">
              {analysis.keywords.slice(0, 2).join(' ')}
            </div>
          )}
        </div>
        
        {/* Summary section */}
        {showSummary && (
          <ArticleSummary article={article} />
        )}
        
        {/* Fact checking section */}
        {showFactCheck && analysis?.factCheck && (
          <div className="mb-4 border rounded-md p-3 bg-muted/30">
            <h3 className="text-sm font-medium mb-2">Fact Check</h3>
            <ul className="space-y-2">
              {analysis.factCheck.map((fact, i) => (
                <li key={i} className="text-xs flex items-start">
                  <Badge 
                    variant={fact.verified ? "default" : "destructive"}
                    className="mt-0.5 mr-2 h-5"
                  >
                    {fact.verified ? 'Verified' : 'Unverified'}
                  </Badge>
                  <div>
                    <p className="mb-0.5">{fact.claim}</p>
                    {fact.source && (
                      <p className="text-muted-foreground">Source: {fact.source}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
