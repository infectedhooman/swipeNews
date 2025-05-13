
export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

// For now, we're using mock data. In a real app, you would replace this with API calls
const mockArticles: Article[] = [
  {
    source: { id: 'techcrunch', name: 'TechCrunch' },
    author: 'Sarah Johnson',
    title: 'New AI Breakthrough Changes How Machines Learn',
    description: 'Researchers have developed a new approach to machine learning that promises to revolutionize how AI systems are trained.',
    url: 'https://example.com/ai-breakthrough',
    urlToImage: 'https://picsum.photos/id/237/600/400',
    publishedAt: '2023-05-15T14:32:00Z',
    content: 'Researchers at MIT have developed a new approach to machine learning...'
  },
  {
    source: { id: 'theverge', name: 'The Verge' },
    author: 'Tom Smith',
    title: 'Apple Announces Next-Generation iPhone',
    description: 'The new iPhone features a completely redesigned camera system and the most powerful chip ever in a smartphone.',
    url: 'https://example.com/new-iphone',
    urlToImage: 'https://picsum.photos/id/1/600/400',
    publishedAt: '2023-05-14T10:15:00Z',
    content: 'Apple today announced the next generation of iPhone with several groundbreaking features...'
  },
  {
    source: { id: 'bbc', name: 'BBC News' },
    author: 'Emma Davis',
    title: 'Climate Summit Reaches Historic Agreement',
    description: 'World leaders have agreed to ambitious new targets to combat climate change at the latest UN summit.',
    url: 'https://example.com/climate-summit',
    urlToImage: 'https://picsum.photos/id/10/600/400',
    publishedAt: '2023-05-13T18:45:00Z',
    content: 'In a landmark agreement, world leaders have committed to reducing carbon emissions...'
  },
  {
    source: { id: 'espn', name: 'ESPN' },
    author: 'Mike Johnson',
    title: 'Underdog Team Wins Championship in Stunning Upset',
    description: 'In one of the biggest surprises in sports history, the underdog team defeated the reigning champions.',
    url: 'https://example.com/championship-upset',
    urlToImage: 'https://picsum.photos/id/20/600/400',
    publishedAt: '2023-05-12T22:30:00Z',
    content: 'In a stunning turn of events, the underdog team has defeated the heavily favored champions...'
  },
  {
    source: { id: 'natgeo', name: 'National Geographic' },
    author: 'Dr. Alan Grant',
    title: 'New Species Discovered in Amazon Rainforest',
    description: 'Biologists have identified a previously unknown species of frog in the remote parts of the Amazon.',
    url: 'https://example.com/new-species',
    urlToImage: 'https://picsum.photos/id/30/600/400',
    publishedAt: '2023-05-11T09:20:00Z',
    content: 'Biologists working in the Amazon rainforest have discovered a new species of frog...'
  },
  {
    source: { id: 'wsj', name: 'Wall Street Journal' },
    author: 'Robert Chen',
    title: 'Global Markets Surge on Economic Recovery Hopes',
    description: 'Stock markets around the world saw significant gains as new economic data suggests a strong recovery.',
    url: 'https://example.com/markets-surge',
    urlToImage: 'https://picsum.photos/id/40/600/400',
    publishedAt: '2023-05-10T16:50:00Z',
    content: 'Global markets surged today following the release of better-than-expected economic data...'
  }
];

export const fetchTopHeadlines = async (): Promise<Article[]> => {
  // In a real app, this would call the News API
  // const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  // const data: NewsResponse = await response.json();
  // return data.articles;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockArticles);
    }, 500); // Simulate network delay
  });
};

export const searchNews = async (query: string): Promise<Article[]> => {
  // In a real app, this would call the News API with the search query
  // const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
  // const data: NewsResponse = await response.json();
  // return data.articles;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredArticles = mockArticles.filter(
        article => 
          article.title.toLowerCase().includes(query.toLowerCase()) || 
          (article.description && article.description.toLowerCase().includes(query.toLowerCase()))
      );
      resolve(filteredArticles);
    }, 500); // Simulate network delay
  });
};
