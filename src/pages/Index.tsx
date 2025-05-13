
import { useState, useEffect, useCallback } from 'react';
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
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTopHeadlines();
  }, []);

  const loadTopHeadlines = async () => {
    setLoading(true);
    setSearchQuery('');
    setCurrentPage(1);
    setHasMore(true);
    try {
      const headlines = await fetchTopHeadlines(1);
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
    setCurrentPage(1);
    setHasMore(true);
    try {
      const results = await searchNews(query, 1);
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

  const loadMoreArticles = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const newArticles = searchQuery 
        ? await searchNews(searchQuery, nextPage)
        : await fetchTopHeadlines(nextPage);
      
      if (newArticles.length === 0) {
        setHasMore(false);
        return;
      }
      
      setArticles(prevArticles => [...prevArticles, ...newArticles]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more articles:', error);
      toast({
        title: 'Error',
        description: 'Failed to load more articles. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, loadingMore, hasMore, searchQuery, toast]);

  // Check if we need to load more articles when user is getting close to the end
  useEffect(() => {
    const threshold = 2; // Load more when only 2 articles left
    if (articles.length - currentIndex <= threshold && hasMore && !loading) {
      loadMoreArticles();
    }
  }, [currentIndex, articles.length, hasMore, loadMoreArticles, loading]);

  const handleSwipeLeft = () => {
    // Dismiss article
    if (currentIndex < articles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (hasMore) {
      // No more articles but we're trying to load more
      toast({
        title: 'Loading more articles',
        description: 'Please wait while we fetch more content for you.',
      });
    } else {
      // No more articles and no more to load
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
    } else if (hasMore) {
      // No more articles but we're trying to load more
      toast({
        title: 'Loading more articles',
        description: 'Please wait while we fetch more content for you.',
      });
    } else {
      // No more articles and no more to load
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
          loadingMore ? (
            <LoadingState />
          ) : (
            <EmptyState 
              type="empty" 
              onRefresh={loadTopHeadlines} 
            />
          )
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
