
interface SummaryRequest {
  articleContent: string;
  summaryType: 'bullets' | 'short' | 'weekly';
}

interface QuestionRequest {
  question: string;
  context?: string[];
}

export interface Summary {
  type: 'bullets' | 'short' | 'weekly';
  content: string[] | string;
}

export interface QuestionAnswer {
  question: string;
  answer: string;
  sources?: { title: string; url: string }[];
}

export interface ArticleAnalysis {
  tags: string[];
  keywords: string[];
  factCheck?: { claim: string; verified: boolean; source?: string }[];
}

// Mock LLM service - to be replaced with actual API calls later
export const generateSummary = async ({ articleContent, summaryType }: SummaryRequest): Promise<Summary> => {
  console.log('Generating summary for:', articleContent.substring(0, 50) + '...');
  
  // Mock responses
  switch (summaryType) {
    case 'bullets':
      return {
        type: 'bullets',
        content: [
          'Researchers developed a new machine learning approach that improves training efficiency.',
          'The technique reduces computational requirements by 40%.',
          'Implementation is available as an open-source project.',
          'Early adopters report significant performance improvements.'
        ]
      };
    case 'short':
      return {
        type: 'short',
        content: 'Researchers developed a breakthrough machine learning technique that improves efficiency while reducing computational requirements.'
      };
    case 'weekly':
      return {
        type: 'weekly',
        content: 'This week in tech: A revolutionary AI breakthrough promises to change how machine learning systems are developed and deployed.'
      };
  }
};

export const askQuestion = async ({ question, context }: QuestionRequest): Promise<QuestionAnswer> => {
  console.log('Processing question:', question);
  
  // Mock response
  if (question.toLowerCase().includes('renewable energy')) {
    return {
      question,
      answer: 'This week in renewable energy, several major solar projects were announced across the Southwest, while wind energy investments increased by 15% compared to last quarter.',
      sources: [
        { title: 'Energy Report Weekly', url: 'https://example.com/energy-report' },
        { title: 'Green Tech Today', url: 'https://example.com/greentech' }
      ]
    };
  }
  
  return {
    question,
    answer: 'Based on recent news, markets have shown volatility due to changing economic indicators and policy announcements.',
    sources: [
      { title: 'Financial Times', url: 'https://example.com/financial' },
      { title: 'Market Watch', url: 'https://example.com/market' }
    ]
  };
};

export const analyzeArticle = async (article: any): Promise<ArticleAnalysis> => {
  // Mock analysis
  return {
    tags: ['Technology', 'AI', 'Research'],
    keywords: ['#MachineLearning', '#AIBreakthrough', '#Research'],
    factCheck: [
      { 
        claim: 'The new approach reduces computational requirements by 40%', 
        verified: true, 
        source: 'MIT Research Paper'
      },
      { 
        claim: 'This is the fastest AI model ever created', 
        verified: false, 
        source: 'No verification found'
      }
    ]
  };
};
