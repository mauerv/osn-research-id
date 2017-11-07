import React, { Component } from 'react'

import RegistryListContainer from '../../ui/registrylist/RegistryListContainer'
import PendingListContainer from '../../ui/registrylist/PendingListContainer'
import Button from '../../../util/Button'

class Registry extends Component {
  render() {
    return(
      <main className="container">
        <div>
          <RegistryListContainer title='Researchers'/>
          <PendingListContainer title='Waiting Approval' />
          <Button text='Hola' onButtonClick={() => alert('hi')}/>
        </div>
      </main>
    )
  }
}

export default Registry
