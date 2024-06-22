import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

type NewsContextType = {
  articles: Article[];
  loading: boolean;
  error: string | null;
  categories: string[];
  selectedCategory: string;
  page: number;
  totalResults: number;
  fetchArticles: (category: string, page: number) => void;
  setCategory: (category: string) => void;
  setPage: (page: number) => void;
};

const NewsContext = createContext<NewsContextType>({
  articles: [],
  loading: true,
  error: null,
  categories: [],
  selectedCategory: 'general',
  page: 1,
  totalResults: 0,
  fetchArticles: () => {},
  setCategory: () => {},
  setPage: () => {},
});

export const useNewsContext = () => useContext(NewsContext);
type NewsProviderProps = {
    children: React.ReactNode; 
  };
export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    fetchArticles(selectedCategory, page);
  }, [selectedCategory, page]);

  const fetchArticles = async (category: string, page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          category,
          country: 'in',
          page,
          pageSize: 100,
          apiKey: '37272b8edf7d4834a1fce6f0acbba1e2',
        },
      });
      const filteredArticles = response.data.articles.filter((article: Article) => (
        article.title !== null &&
        article.title !== '' &&
        article.content !== null &&
        article.content !== '' &&
        article.description !== null &&
        article.description !== '' &&
        article.urlToImage !== null &&
        article.urlToImage !== '' &&
        !article.title.toLowerCase().includes('null') &&
        !article.title.toLowerCase().includes('removed') &&
        !article.content.toLowerCase().includes('null') &&
        !article.content.toLowerCase().includes('removed') &&
        !article.description.toLowerCase().includes('null') &&
        !article.description.toLowerCase().includes('removed')
      ));
      console.log(filteredArticles);
      setArticles(filteredArticles);
      setTotalResults(filteredArticles.length); 
      setLoading(false);
    } catch (err) {
        if (axios.isAxiosError(err)) {          
          setError(err.message);
        } else {          
          setError('An error occurred while fetching data.');
        }
        setLoading(false);
      }
  };

  const setCategory = (category: string) => {
    setSelectedCategory(category);
    setPage(1); 
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        loading,
        error,
        categories,
        selectedCategory,
        page,
        totalResults,
        fetchArticles,
        setCategory,
        setPage,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default NewsContext;
