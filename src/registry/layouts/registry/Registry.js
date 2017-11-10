import React, { Component } from 'react'

import RegistryListContainer from '../../ui/researcherList/RegistryListContainer'
import PendingListContainer from '../../ui/pendingList/PendingListContainer'

class Registry extends Component {
  render() {
    return(
      <main className="container">
        <div>
          <RegistryListContainer title='Researchers'/>
          <PendingListContainer title='Waiting Approval' />
        </div>
      </main>
    )
  }
}

export default Registry
