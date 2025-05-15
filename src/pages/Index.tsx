// src/pages/Index.tsx
import { useState, useEffect, useCallback } from 'react'
import {
  fetchTopHeadlines,
  searchNews,
  Article
} from '@/services/newsService'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import NewsCard from '@/components/NewsCard'
import SavedArticles from '@/components/SavedArticles'
import EmptyState from '@/components/EmptyState'
import LoadingState from '@/components/LoadingState'
import NewsChat from '@/components/NewsChat'
import { useToast } from '@/components/ui/use-toast'

const PAGE_SIZE = 10

export default function Index() {
  const [articles, setArticles] = useState<Article[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [savedArticles, setSavedArticles] = useState<Article[]>([])
  const [showSaved, setShowSaved] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadTopHeadlines()
  }, [])

  // Fetch first page of headlines
  const loadTopHeadlines = async () => {
    setLoading(true)
    setSearchQuery('')
    setCurrentPage(1)
    setHasMore(true)
    try {
      const firstPage = await fetchTopHeadlines(1)
      setArticles(firstPage)
      setCurrentIndex(0)
    } catch (e) {
      console.error(e)
      toast({
        title: 'Error',
        description: 'Failed to load headlines.',
        variant: 'destructive'
      })
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  // Search handler
  const handleSearch = async (q: string) => {
    setLoading(true)
    setSearchQuery(q)
    setCurrentPage(1)
    setHasMore(true)
    try {
      const results = await searchNews(q, 1)
      setArticles(results)
      setCurrentIndex(0)
    } catch (e) {
      console.error(e)
      toast({
        title: 'Error',
        description: 'Search failed.',
        variant: 'destructive'
      })
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  // Advance index or load more then advance
  const handleNext = useCallback(async () => {
    // If next card loaded, just advance
    if (currentIndex < articles.length - 1) {
      setCurrentIndex(i => i + 1)
      return
    }

    // At last loaded card
    if (!hasMore || loadingMore) {
      toast({
        title: 'No more articles',
        description: searchQuery
          ? 'Try a new search query.'
          : 'Check back later for more headlines.'
      })
      return
    }

    // Load more then advance
    setLoadingMore(true)
    try {
      const nextPage = currentPage + 1
      const newBatch = searchQuery
        ? await searchNews(searchQuery, nextPage)
        : await fetchTopHeadlines(nextPage)

      if (newBatch.length === 0) {
        setHasMore(false)
        toast({
          title: 'End of feed',
          description: 'No further articles available.'
        })
      } else {
        setArticles(prev => [...prev, ...newBatch])
        setCurrentPage(nextPage)
        setCurrentIndex(i => i + 1)
      }
    } catch (e) {
      console.error(e)
      toast({
        title: 'Error',
        description: 'Failed to load more articles.',
        variant: 'destructive'
      })
    } finally {
      setLoadingMore(false)
    }
  }, [
    articles.length,
    currentIndex,
    currentPage,
    hasMore,
    loadingMore,
    searchQuery,
    toast
  ])

  // Swipe handlers
  const handleSwipeLeft = () => {
    handleNext()
  }
  const handleSwipeRight = () => {
    const art = articles[currentIndex]
    if (!savedArticles.some(a => a.url === art.url)) {
      setSavedArticles(prev => [...prev, art])
      toast({ title: 'Saved', description: 'Article added to your list.' })
    }
    handleNext()
  }

  const currentArticle = articles[currentIndex]
  const isEmpty = !loading && !currentArticle

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto px-4 py-6">
        <Header
          savedCount={savedArticles.length}
          onShowSaved={() => setShowSaved(true)}
        />
        <SearchBar onSearch={handleSearch} />

        {/* Debug controls (optional) */}
        <div className="flex justify-between my-4">
          <button
            onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Prev
          </button>
          <button
            onClick={() => handleNext()}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>

        {loading ? (
          <LoadingState />
        ) : isEmpty ? (
          <EmptyState onRefresh={loadTopHeadlines} type="empty" />
        ) : (
          <NewsCard
            key={currentArticle!.url}
            article={currentArticle!}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onOpenChat={() => setShowChat(true)}
          />
        )}

        {showSaved && (
          <SavedArticles
            articles={savedArticles}
            onRemove={url =>
              setSavedArticles(sa => sa.filter(a => a.url !== url))
            }
            onClose={() => setShowSaved(false)}
          />
        )}

        {/* Pass currentArticle into NewsChat */}
        {showChat && currentArticle && (
          <NewsChat
            article={currentArticle}
            onClose={() => setShowChat(false)}
          />
        )}
      </div>
    </div>
  )
}
