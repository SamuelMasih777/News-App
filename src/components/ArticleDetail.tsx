import React from 'react';
import { useParams, useNavigate , Link} from 'react-router-dom';
import { useNewsContext } from '../context/NewContext';

const ArticleDetail: React.FC = () => {
  const { url } = useParams<{ url: string }>(); 
  const { articles, selectedCategory } = useNewsContext();
  const navigate = useNavigate();

  const article = articles.find((article) => article.url === url);
  if (!article) return <p>Article not found.</p>;

  const relatedArticles = articles.filter((a) => a.url !== article.url).slice(0, 6);

  const goBack = () => {
    navigate(`/${selectedCategory}`)
  };

  return (
    <div className="bg-black mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-50">{article.title}</h1>
      <img
        src={article.urlToImage}
        alt={article.title}
        className="w-full h-96 object-cover mb-4 rounded"
      />
      <p className="text-gray-200 mb-6">{article.description} {article.content}</p>

      <h2 className="mt-24 text-3xl font-bold mb-4 text-gray-50 text-center">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedArticles.map((relatedArticle, index) => (
          <div key={index} className="border border-slate-600 p-4 rounded-md">
            <Link to={`/article/${encodeURIComponent(relatedArticle.url)}`}>
              <img
                src={relatedArticle.urlToImage}
                alt={relatedArticle.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-bold text-white">{relatedArticle.title}</h3>
              <p className="text-gray-400">{relatedArticle.description}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12 mb-12">
        <button
          onClick={goBack}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          {`Back to ${selectedCategory.toUpperCase()} News Category`}
        </button>
      </div>
    </div>
  );
};

export default ArticleDetail;
