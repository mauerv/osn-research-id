import React from 'react'
import Button from '../../../util/Button'

const PendingList = ({ pendingResearchers, title, onButtonClick, waitingApproval }) => {
  return(
    <div>
      <h2>{title}</h2>
      <ul>
          {pendingResearchers.map(researcher => <li key={researcher}>{researcher}</li>)}
      </ul>
      <Button text='Request Approval' onButtonClick={onButtonClick}/>
    </div>
  )
}

export default PendingList
