import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { ResearcherIsAuthenticated, ResearcherIsNotAuthenticated } from './util/wrappers.js'
import { getWeb3 } from './actions/getWeb3'
import { requestResearchers } from './actions/ResearcherListActions'
import { requestPendingResearchers } from './actions/PendingListActions'
// Layouts
import App from './App'
import Home from './layouts/Home'
import Dashboard from './layouts/Dashboard'
import SignUp from './layouts/SignUp'
import Profile from './layouts/Profile'
import Registry from './layouts/Registry'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  store.dispatch(requestResearchers())
  store.dispatch(requestPendingResearchers())
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={ResearcherIsAuthenticated(Dashboard)} />
          <Route path="signup" component={ResearcherIsNotAuthenticated(SignUp)} />
          <Route path="profile" component={ResearcherIsAuthenticated(Profile)} />
          <Route path="registry" component={ResearcherIsAuthenticated(Registry)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
