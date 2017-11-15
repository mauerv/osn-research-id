import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import researcherReducer from './reducers/researcherReducer'
import web3Reducer from './reducers/web3Reducer'
import registryReducer from './reducers/registryReducer'

const reducer = combineReducers({
  routing: routerReducer,
  researcher: researcherReducer,
  web3: web3Reducer,
  registry: registryReducer
})

export default reducer
