import { connect } from 'react-redux'
import PendingList from '../components/PendingList'
import { requestApproval } from '../actions/PendingListActions'

const mapStateToProps = (state, ownProps) => {
  return {
    pendingResearchers: state.registry.pending,
    waitingApproval: state.registry.waitingApproval
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick: () => {
      dispatch(requestApproval())
    }
  }
}

const PendingListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingList)

export default PendingListContainer
