import ResearcherRegistry from '../../build/contracts/ResearcherRegistry.json'
import store from '../store'
const contract = require('truffle-contract')

export const REQUEST_RESEARCHERS_SUCCESS = 'REQUEST_RESEARCHERS_SUCCESS'

function requestResearchersCreator(researchers) {
  return {
    type: REQUEST_RESEARCHERS_SUCCESS,
    payload: researchers
  }
}

export const requestResearchers = () => {
  return function(dispatch) {
    // Logout user.
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
