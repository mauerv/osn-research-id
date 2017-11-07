import { connect } from 'react-redux'
import RegistryList from './RegistryList'

const mapStateToProps = (state, ownProps) => {
  return {
    researchers: state.registry.researchers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const RegistryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistryList)

export default RegistryListContainer
