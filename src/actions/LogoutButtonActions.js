import { browserHistory } from 'react-router'

export const RESEARCHER_LOGGED_OUT = 'RESEARCHER_LOGGED_OUT'
function researcherLoggedOut() {
  return {
    type: RESEARCHER_LOGGED_OUT
  }
}

export function logoutResearcher() {
  return function(dispatch) {
    // Logout researcher.
    dispatch(researcherLoggedOut())

    // Redirect home.
    return browserHistory.push('/')
  }
}
