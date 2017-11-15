import { browserHistory } from 'react-router'

export const RESEARCHER_LOGGED_OUT = 'RESEARCHER_LOGGED_OUT'
function researcherLoggedOut(researcher) {
  return {
    type: RESEARCHER_LOGGED_OUT,
    payload: researcher
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
