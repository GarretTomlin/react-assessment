import React from 'react'

interface DeckInnerCardControlsProps {
    onDelete: () => void;
  }
  
  function DeckInnerCardControls({ onDelete }: DeckInnerCardControlsProps) {
  return (
    <div className="flex gap-2 absolute ml-40 top-0 mt-2">
     
     <button className="btn btn-active p-3 bg-[#fff] hover:bg-transparent"> 
        <img src="../../icons/move.svg" alt="" width="20" height="21" />
      </button>
  
  
      <button className="btn btn-active p-3 bg-[#fff] hover:bg-transparent "         onClick={onDelete}> 
        <img src="../../icons/bin.svg" alt="" width="20" height="21" />
      </button>
    

  </div>
  )
}

export default DeckInnerCardControls