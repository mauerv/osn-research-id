import ResearcherRegistry from '../../build/contracts/ResearcherRegistry.json'
import { browserHistory } from 'react-router'
import { requestPending, requestResearchers } from './RegistryListActions'
import store from '../store'

const contract = require('truffle-contract')

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user, isOwner) {
  return {
    type: USER_LOGGED_IN,
    payload: user,
    isOwner: isOwner
  }
}

export function loginUser() {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the registry object.
      const registry = contract(ResearcherRegistry)
      registry.setProvider(web3.currentProvider)
      // Declaring this for later so we can chain functions on Authentication.
      var registryInstance, isOwner

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        registry.deployed().then(function(instance) {
          registryInstance = instance
          registryInstance.getPending().then(result => console.log(result))

          registryInstance.owner().then(result => {
            isOwner = result == coinbase

            // Attempt to login user.
            registryInstance.login({from: coinbase})
            .then(function(result) {
              // If no error, login user.
              var userName = web3.toUtf8(result)
              dispatch(requestResearchers())
              dispatch(requestPending())
              dispatch(userLoggedIn({"name": userName}, isOwner))

            })
            .then(function() {
              // Used a manual redirect here as opposed to a wrapper.
              // This way, once logged in a user can still access the home page.
              var currentLocation = browserHistory.getCurrentLocation()

              if ('redirect' in currentLocation.query)
              {
                return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
              }

              return browserHistory.push('/registry')
            })
          })
          .catch(function(result) {
            // If error, go to signup page.
            console.error('Wallet ' + coinbase + ' does not have an account!')

            return browserHistory.push('/signup')
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
