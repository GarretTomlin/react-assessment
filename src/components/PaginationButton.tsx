import React from 'react'

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

function PaginationButton({ currentPage, pageCount, onPageChange }: PaginationProps) {
  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  const handleClick = (page: number) => {
    onPageChange(page);
  };
  return (
 <div className='mt-10'>
     <div className="btn-group">
    <button className="btn bg-[#ffff] hover:bg-transparent text-black text-xl" >&lt;</button>
    {pages.map((page) => (

    <button className="btn bg-[#ffff] hover:bg-transparent text-black text-xl" onClick={() => handleClick(page)}>{page}</button>
    ))}

    <button className="btn bg-[#ffff] hover:bg-transparent text-black text-xl"> &gt; </button>
  </div>
 </div>
  )
}

export default PaginationButton
