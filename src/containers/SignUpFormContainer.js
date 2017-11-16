import { connect } from 'react-redux'
import SignUpForm from '../components/SignUpForm'
import { signUpResearcher } from '../actions/SignUpFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpFormSubmit: (name, email) => {
      dispatch(signUpResearcher(name, email))
    }
  }
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)

export default SignUpFormContainer
