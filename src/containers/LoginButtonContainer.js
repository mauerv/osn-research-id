import { connect } from 'react-redux'
import LoginButton from '../components/LoginButton'
import { loginResearcher } from '../actions/LoginButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginResearcherClick: (event) => {
      event.preventDefault();

      dispatch(loginResearcher())
    }
  }
}

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton)

export default LoginButtonContainer
