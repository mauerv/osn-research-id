import React from 'react'
import { connect } from 'react-redux'

import ResearcherListContainer from '../containers/ResearcherListContainer'
import PendingListContainer from '../containers/PendingListContainer'

const RegistryComponent  = ({isOwner}) => {
    return (
      <main className="container">
        <div>
          <ResearcherListContainer title='Researchers'/>
          {isOwner ? <PendingListContainer title='Waiting Approval' /> : <p></p>}
        </div>
      </main>
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    isOwner: state.researcher.isOwner
  }
}

const Registry = connect(
  mapStateToProps
)(RegistryComponent)

export default Registry
