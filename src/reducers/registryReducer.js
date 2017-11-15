import { REQUEST_RESEARCHERS_SUCCESS } from '../actions/ResearcherListActions'
import { REQUEST_PENDING_SUCCESS } from '../actions/PendingListActions'

let initialState = {
  researchers: [],
  pending: [],
  owner: false
}

const registryReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_RESEARCHERS_SUCCESS:
      return Object.assign({}, state, {
        researchers: action.payload
      })
    case REQUEST_PENDING_SUCCESS:
      return Object.assign({}, state, {
        pending: action.payload
      })
    default:
      return state
  }

}

export default registryReducer
