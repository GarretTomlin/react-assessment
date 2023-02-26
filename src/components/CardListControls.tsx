import React from 'react';
import BreadCrumb from './BreadCrumb';
import CardFilter from './cardFilter';

function CardListControls() {
  return (
    <div className="flex flex-col mt-4 relative">
      <BreadCrumb />
      <div className="relative inline-block">
        <input type="text" placeholder="Type here" className="input w-full max-w-xs bg-white pr-8" />
        <svg className="h-4 w-4 fill-current absolute top-1/2 transform -translate-y-1/2 ml-72" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M8.5 15a6.5 6.5 0 1 1 4.506-1.804l4.244 4.243a.5.5 0 0 1-.708.708l-4.243-4.244A6.45 6.45 0 0 1 8.5 15zm0-11a4.5 4.5 0 1 0 4.5 4.5A4.506 4.506 0 0 0 8.5 4z " stroke='#3B3B3B'/>
        </svg>
      </div>
      <CardFilter />
    </div>
  );
}

export default CardListControls;
