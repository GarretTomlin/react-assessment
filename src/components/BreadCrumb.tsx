import React from "react";

// interface BreadcrumbProps {
//   deckName: string;
//   cardName: string;
// }

const BreadCrumb: React.FC = () => {
  return (
    <div className="text-sm breadcrumbs">
    <ul>
      <li className="text-black"><a>All Card</a></li> 
      <li className="text-black"><a>Select a card</a></li> 
    </ul>
  </div>


  );
};

export default BreadCrumb;
