import { REQUEST_RESEARCHERS_SUCCESS, REQUEST_PENDING_SUCCESS } from '../actions/RegistryListActions'
import { REQUEST_APPROVAL, REQUEST_APPROVAL_SUCCESS } from '../actions/PendingListActions'

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
    case REQUEST_APPROVAL:

    case REQUEST_APPROVAL_SUCCESS:
      return {
        ...state,
        pending: [...state['pending'], action.payload]
      }

    default:
      return state
  }

}

export default registryReducer
