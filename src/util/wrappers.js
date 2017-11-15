import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

// Layout Component Wrappers

export const ResearcherIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.researcher.data,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/', // '/login' by default.
  wrapperDisplayName: 'ResearcherIsAuthenticated'
})

export const ResearcherIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.researcher,
  redirectAction: routerActions.replace,
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/dashboard',
  wrapperDisplayName: 'ResearcherIsNotAuthenticated',
  predicate: researcher => researcher.data === null,
  allowRedirectBack: false
})

// UI Component Wrappers

export const VisibleOnlyAuth = UserAuthWrapper({
  authSelector: state => state.researcher,
  wrapperDisplayName: 'VisibleOnlyAuth',
  predicate: researcher => researcher.data,
  FailureComponent: null
})

export const HiddenOnlyAuth = UserAuthWrapper({
  authSelector: state => state.researcher,
  wrapperDisplayName: 'HiddenOnlyAuth',
  predicate: researcher => researcher.data === null,
  FailureComponent: null
})
