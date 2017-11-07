import { connect } from 'react-redux'
import RegistryList from './RegistryList'

const mapStateToProps = (state, ownProps) => {
  return {
    researchers: state.registry.pending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const PendingListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistryList)

export default PendingListContainer
