import ResearcherRegistry from '../../build/contracts/ResearcherRegistry.json'
import store from '../store'
import { requestResearchers } from './ResearcherListActions'
const contract = require('truffle-contract')

export const REQUEST_PENDING_SUCCESS = 'REQUEST_PENDING_SUCCESS'

function requestPending(pendingResearchers) {
  return {
    type: REQUEST_PENDING_SUCCESS,
    payload: pendingResearchers
  }
}

export const requestPendingResearchers = () => {
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
          dispatch(requestPending(result))
        })
      })
    }
  }
}

export const approveResearcherID = (id) => {
  return function(dispatch) {
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
      const registry = contract(ResearcherRegistry)
      registry.setProvider(web3.currentProvider)
      var registryInstance
      web3.eth.getCoinbase((error, coinbase) => {
        if (error) {
          console.error(error)
        }
        registry.deployed().then(function(instance) {
          registryInstance = instance

          registryInstance.approveID(id, {from: coinbase})
          .then(function() {
            dispatch(requestResearchers())
            dispatch(requestPendingResearchers())
          })
        })
      })
    }
  }
}

export const rejectResearcherID = (id) => {
  return function(dispatch) {
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
      const registry = contract(ResearcherRegistry)
      registry.setProvider(web3.currentProvider)
      var registryInstance
      web3.eth.getCoinbase((error, coinbase) => {
        if (error) {
          console.error(error)
        }
        registry.deployed().then(function(instance) {
          registryInstance = instance

          registryInstance.rejectID(id, {from: coinbase})
          .then(function() {
            dispatch(requestResearchers())
            dispatch(requestPendingResearchers())
          })
        })
      })
    }
  }
}
