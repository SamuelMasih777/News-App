import React from "react";
import { Link } from "react-router-dom";
import { useNewsContext } from "../context/NewContext";

const Navbar: React.FC = () => {
  const { categories, selectedCategory, setCategory } = useNewsContext();

  const handleCategoryClick = (category: string) => {
    setCategory(category);
  };

  return (
    <nav className="bg-black p-4 border-b border-slate-600">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-white text-2xl font-bold text-blue-500">
          <Link to="/">Good-News-App</Link>
        </h1>
        <div className="flex flex-wrap mt-4 sm:mt-0 space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
          {categories.map((category: string) => (
            <Link
              key={category}
              to={`/${category}`}
              onClick={() => handleCategoryClick(category)}
              className={`text-white text-md p-1.5 uppercase ${
                category === selectedCategory
                  ? "rounded-xl bg-gray-300 p-1.5 text-gray-950"
                  : "hover:underline"
              }`}
            >
              {category.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
