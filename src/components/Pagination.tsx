import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <nav className="bg-black px-4 py-3 flex items-center justify-between sm:px-6">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-100">
          Showing page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <button
          onClick={handlePreviousClick}
          disabled={currentPage === 1}
          className={`rounded-lg bg-black relative inline-flex items-center px-4 py-2 border border-gray-300  text-sm font-medium text-gray-100 hover:bg-gray-900 ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`rounded-lg ml-3 bg-black relative inline-flex items-center px-4 py-2 border border-gray-300  text-sm font-medium text-gray-100 hover:bg-gray-900 ${
            currentPage === totalPages || totalPages === 0 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
