import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="join mt-4 flex justify-end">
      <button
        className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Précédent
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`join-item btn ${currentPage === i + 1 ? 'btn-active' : ''}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className={`join-item btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
