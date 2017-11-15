import ResearcherRegistry from '../../build/contracts/ResearcherRegistry.json'
import store from '../store'
import { requestPendingResearchers } from './PendingListActions'
const contract = require('truffle-contract')

export const REQUEST_RESEARCHERS_SUCCESS = 'REQUEST_RESEARCHERS_SUCCESS'
export const REMOVE_RESEARCHER = 'REMOVE_RESEARCHER'

function requestResearchersCreator(researchers) {
  return {
    type: REQUEST_RESEARCHERS_SUCCESS,
    payload: researchers
  }
}

function removeResearcher(id) {
  return {
    type: REMOVE_RESEARCHER,
    payload: id
  }
}

export const requestResearchers = () => {
  return function(dispatch) {
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
      const registry = contract(ResearcherRegistry)
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

export const removeResearcherID = (id) => {
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

          registryInstance.revokeID(id, {from: coinbase})
          .then(function() {
            dispatch(requestResearchers())
            dispatch(requestPendingResearchers())
          })
        })
      })
    }
  }
}
