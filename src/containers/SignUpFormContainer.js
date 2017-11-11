import { connect } from 'react-redux'
import SignUpForm from '../components/SignUpForm'
import { signUpUser } from '../actions/SignUpFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpFormSubmit: (name) => {
      dispatch(signUpUser(name))
    }
  }
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)

export default SignUpFormContainer
