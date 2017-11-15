import ResearcherRegistry from '../../build/contracts/ResearcherRegistry.json'
import { browserHistory } from 'react-router'
import store from '../store'

const contract = require('truffle-contract')

export function signUpResearcher(name) {
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
          // Check that the researcher is not already signed-up.
          if (
              store.getState().registry.pending.indexOf(coinbase) != -1 ||
              store.getState().registry.researchers.indexOf(coinbase) != -1
             ) {
            alert('The account is already registered.');
            return
          }

          // Attempt to sign up researcher.
          registryInstance.signup(name, {from: coinbase})
          .then(function(result) {

            browserHistory.push('/')
            return alert('Successful Sign-Up')
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
