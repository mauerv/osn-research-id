import { connect } from 'react-redux'
import RegistryList from '../components/RegistryList'
import { removeResearcherID } from '../actions/ResearcherListActions'

const mapStateToProps = (state, ownProps) => {
  return {
    researchers: state.registry.researchers,
    isOwner: state.user.isOwner
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick: (id) => {
      dispatch(removeResearcherID(id))
    }
  }
}

const RegistryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistryList)

export default RegistryListContainer
