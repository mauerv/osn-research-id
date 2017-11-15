import { connect } from 'react-redux'
import LogoutButton from '../components/LogoutButton'
import { logoutResearcher } from '../actions/LogoutButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutResearcherClick: (event) => {
      event.preventDefault();

      dispatch(logoutResearcher())
    }
  }
}

const LogoutButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButton)

export default LogoutButtonContainer
