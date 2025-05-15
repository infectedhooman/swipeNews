// src/services/newsService.ts

export interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

const API_KEY = '8f21a1794c19422ea908559cdc871bb6';
const BASE_URL = 'https://newsapi.org/v2';
const PAGE_SIZE = 10;

/**
 * Fetch top headlines directly from NewsAPI
 */
export async function fetchTopHeadlines(page: number = 1): Promise<Article[]> {
  const url = `${BASE_URL}/top-headlines?country=us&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`NewsAPI error: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data.articles;
}

/**
 * Search news articles by query directly from NewsAPI
 */
export async function searchNews(query: string, page: number = 1): Promise<Article[]> {
  const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`NewsAPI error: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data.articles;
}
