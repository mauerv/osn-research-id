import ResearcherRegistry from '../../build/contracts/ResearcherRegistry.json'
import store from '../store'
const contract = require('truffle-contract')

export const REQUEST_APPROVAL_SUCCESS = 'REQUEST_APPROVAL_SUCCESS'
export const REQUEST_PENDING_SUCCESS = 'REQUEST_PENDING_SUCCESS'

function approvalSuccess(address) {
  return {
    type: REQUEST_APPROVAL_SUCCESS,
    payload: address
  }
}

function requestPendingCreator(pendingResearchers) {
  return {
    type: REQUEST_PENDING_SUCCESS,
    payload: pendingResearchers
  }
}

export const requestPending = () => {
  return function(dispatch) {
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
      const registry = contract(ResearcherRegistry)
      registry.setProvider(web3.currentProvider)
      var registryInstance
      registry.deployed().then(function(instance) {
        registryInstance = instance
        registryInstance.getPending.call()
        .then(function(result) {
          dispatch(requestPendingCreator(result))
        })
      })
    }
  }
}

export const requestApproval = () => {
  return function(dispatch) {
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
      const registry = contract(ResearcherRegistry)
      registry.setProvider(web3.currentProvider)
      var registryInstance
      web3.eth.getCoinbase((error, coinbase) => {
        console.log('Coinbase', coinbase)
        if (error) {
          console.error(error);
        }
        if (store.getState().registry.pending.indexOf(coinbase) != -1) {
          registry.deployed().then(function(instance) {
            registryInstance = instance

            registryInstance.getID({from: coinbase})
            .then(function() {
              dispatch(approvalSuccess(coinbase))
            })
          })
        } else {
          alert('The address is already pending')
        }
      })
    }
  }
}
