import React from 'react'
import { connect } from 'react-redux'

import RegistryListContainer from '../containers/RegistryListContainer'
import PendingListContainer from '../containers/PendingListContainer'

const RegistryComponent  = ({isOwner}) => {
    return (
      <main className="container">
        <div>
          <RegistryListContainer title='Researchers'/>
          {isOwner ? <PendingListContainer title='Waiting Approval' /> : <p></p>}
        </div>
      </main>
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    isOwner: state.user.isOwner
  }
}

const Registry = connect(
  mapStateToProps
)(RegistryComponent)

export default Registry
