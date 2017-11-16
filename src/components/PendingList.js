import React from 'react'
import PendingListItem from './PendingListItem'

const PendingList = ({ pendingResearchers, title, onApproveClick, onRejectClick }) => {
  return(
    <div>
      <h2 className='list-title'>{title}</h2>
      <ul className='researcher-list'>
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
