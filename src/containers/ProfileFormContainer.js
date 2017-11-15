import { connect } from 'react-redux'
import ProfileForm from '../components/ProfileForm'
import { updateResearcher } from '../actions/ProfileFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.researcher.data.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileFormSubmit: (name) => {
      event.preventDefault();

      dispatch(updateResearcher(name))
    }
  }
}

const ProfileFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm)

export default ProfileFormContainer
