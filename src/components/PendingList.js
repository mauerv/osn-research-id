import React from 'react'
import PendingListItem from './PendingListItem'

const PendingList = ({ pendingResearchers, title, onApproveClick, onRejectClick }) => {
  return(
    <div>
      <h2>{title}</h2>
      <ul>
          {pendingResearchers.map(researcher => {
              if (researcher != 0x0) return <PendingListItem key={researcher}
                                                             id={researcher}
                                                             onApproveClick={onApproveClick}
                                                             onRejectClick={onRejectClick}/>
          })}
      </ul>
    </div>
  )
}

export default PendingList
