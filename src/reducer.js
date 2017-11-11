import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './reducers/userReducer'
import web3Reducer from './reducers/web3Reducer'
import registryReducer from './reducers/registryReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  registry: registryReducer
})

export default reducer
