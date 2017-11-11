import React, { Component } from 'react'

import RegistryListContainer from '../containers/RegistryListContainer'
import PendingListContainer from '../containers/PendingListContainer'

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
