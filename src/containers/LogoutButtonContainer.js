import { connect } from 'react-redux'
import LogoutButton from '../components/LogoutButton'
import { logoutUser } from '../actions/LogoutButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutUserClick: (event) => {
      event.preventDefault();

      dispatch(logoutUser())
    }
  }
}

const LogoutButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButton)

export default LogoutButtonContainer
