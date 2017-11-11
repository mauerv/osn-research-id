import RegistryContract from '../../build/contracts/Registry.json'
import store from '../store'
const contract = require('truffle-contract')

export const REQUEST_RESEARCHERS_SUCCESS = 'REQUEST_RESEARCHERS_SUCCESS'
export const REQUEST_PENDING_SUCCESS = 'REQUEST_PENDING_SUCCESS'

function requestResearchersCreator(researchers) {
  return {
    type: REQUEST_RESEARCHERS_SUCCESS,
    payload: researchers
  }
}

function requestPendingCreator(pendingResearchers) {
  return {
    type: REQUEST_PENDING_SUCCESS,
    payload: pendingResearchers
  }
}

export const requestResearchers = () => {
  return function(dispatch) {
    // Logout user.
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
      const registry = contract(RegistryContract)
      registry.setProvider(web3.currentProvider)
      var registryInstance
      registry.deployed().then(function(instance) {
        registryInstance = instance
        registryInstance.getResearchers.call()
        .then(function(result) {
          dispatch(requestResearchersCreator(result))
        })
      })
    }
  }
}

export const requestPending = () => {
  return function(dispatch) {
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
      const registry = contract(RegistryContract)
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
