import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNewsContext } from '../context/NewContext';
import Pagination from './Pagination';

const ArticleList: React.FC = () => {
  const { articles, loading, error, totalResults, selectedCategory } = useNewsContext();
  const articlesPerPage = 12; 

  const [page, setPage] = useState(1);

  if (loading) {
    return (
      <div className="bg-black h-screen flex justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black h-screen flex justify-center items-center text-white">
        <p className="text-center">
          Error: {error} code "426 Means TO Upgrade the API Plan"
          <br />
          RELOAD The Page
        </p>
      </div>
    );
  }

  
  const startIndex = (page - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalResults / articlesPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  
  // Welcome messages
  const welcomeMessage = "Welcome to Good-News-App!";
  const categoryMessage = selectedCategory
    ? `Read the latest articles in ${selectedCategory.toUpperCase()} and get updated on what's happening in the world.`
    : "Read the latest articles and get updated on what's happening in the world.";

  return (
    <div className="bg-black mx-auto p-6">
      <div className="text-center text-white mb-12 mt-6">
        <h1 className="text-3xl font-bold">{welcomeMessage}</h1>
        <p className="text-lg mt-2">{categoryMessage}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentArticles.map((article, index) => (
          <div key={index} className="border border-slate-600 p-4 rounded-md">
            <Link to={`/article/${encodeURIComponent(article.url)}`}>
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-bold text-white">{article.title}</h2>
              <p className="text-gray-400">{article.description}</p>
            </Link>
          </div>
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
    </div>
  );
};

export default ArticleList;
