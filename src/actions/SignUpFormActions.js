import ResearcherRegistry from '../../build/contracts/ResearcherRegistry.json'
import { loginUser } from '../actions/LoginButtonActions'
import store from '../store'
import { requestPending, requestResearchers } from './RegistryListActions'

const contract = require('truffle-contract')

export function signUpUser(name) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the registry object.
      const registry = contract(ResearcherRegistry)
      registry.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var registryInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        registry.deployed().then(function(instance) {
          registryInstance = instance
          // Attempt to sign up user.
          registryInstance.signup(name, {from: coinbase})
          .then(function(result) {

          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
