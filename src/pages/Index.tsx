
import { useState, useEffect } from 'react';
import { fetchTopHeadlines, searchNews, Article } from '@/services/newsService';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import NewsCard from '@/components/NewsCard';
import SavedArticles from '@/components/SavedArticles';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import NewsChat from '@/components/NewsChat';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadTopHeadlines();
  }, []);

  const loadTopHeadlines = async () => {
    setLoading(true);
    setSearchQuery('');
    try {
      const headlines = await fetchTopHeadlines();
      setArticles(headlines);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error fetching headlines:', error);
      toast({
        title: 'Error',
        description: 'Failed to load headlines. Please try again.',
        variant: 'destructive',
      });
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    try {
      const results = await searchNews(query);
      setArticles(results);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error searching news:', error);
      toast({
        title: 'Error',
        description: 'Failed to search news. Please try again.',
        variant: 'destructive',
      });
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipeLeft = () => {
    // Dismiss article
    if (currentIndex < articles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // No more articles
      toast({
        title: 'End of articles',
        description: searchQuery 
          ? 'Try searching for something else' 
          : 'Check back later for more headlines',
      });
    }
  };

  const handleSwipeRight = () => {
    // Save article
    const currentArticle = articles[currentIndex];
    
    if (!savedArticles.some(article => article.url === currentArticle.url)) {
      setSavedArticles([...savedArticles, currentArticle]);
      toast({
        title: 'Article saved',
        description: 'The article has been added to your saved list.',
      });
    }
    
    if (currentIndex < articles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // No more articles
      toast({
        title: 'End of articles',
        description: searchQuery 
          ? 'Try searching for something else' 
          : 'Check back later for more headlines',
      });
    }
  };

  const handleRemoveSaved = (articleUrl: string) => {
    setSavedArticles(savedArticles.filter(article => article.url !== articleUrl));
  };

  const handleOpenChat = () => {
    setShowChat(true);
  };

  const currentArticle = articles[currentIndex];
  const hasArticles = articles.length > 0;
  const hasMoreArticles = currentIndex < articles.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto px-4 py-6">
        <Header 
          savedCount={savedArticles.length} 
          onShowSaved={() => setShowSaved(true)} 
        />
        
        <SearchBar onSearch={handleSearch} />
        
        {loading ? (
          <LoadingState />
        ) : !hasArticles ? (
          <EmptyState 
            type="no-results" 
            onRefresh={loadTopHeadlines} 
          />
        ) : !hasMoreArticles ? (
          <EmptyState 
            type="empty" 
            onRefresh={loadTopHeadlines} 
          />
        ) : (
          <NewsCard 
            article={currentArticle} 
            onSwipeLeft={handleSwipeLeft} 
            onSwipeRight={handleSwipeRight}
            onOpenChat={handleOpenChat}
          />
        )}
        
        {showSaved && (
          <SavedArticles 
            articles={savedArticles} 
            onRemove={handleRemoveSaved} 
            onClose={() => setShowSaved(false)} 
          />
        )}

        {showChat && (
          <NewsChat onClose={() => setShowChat(false)} />
        )}
      </div>
    </div>
  );
};

export default Index;
