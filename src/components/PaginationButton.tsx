import React from 'react'

function PaginationButton() {
  return (
 <div className='mt-10'>
     <div className="btn-group">
    <button className="btn bg-[#ffff] hover:bg-transparent text-black text-xl" >&lt;</button>
    <button className="btn bg-[#ffff] hover:bg-transparent text-black text-xl">1</button>
    <button className="btn bg-[#ffff] hover:bg-transparent text-black text-xl"> &gt; </button>
  </div>
 </div>
  )
}

export default PaginationButton