import React from 'react'
import PendingListItem from './PendingListItem'

const PendingList = ({ pendingResearchers, title, onButtonClick }) => {
  return(
    <div>
      <h2>{title}</h2>
      <ul>
          {pendingResearchers.map(researcher => {
              if (researcher != 0x0) return <PendingListItem key={researcher} id={researcher} onButtonClick={onButtonClick}/>
          })}
      </ul>
    </div>
  )
}

export default PendingList
