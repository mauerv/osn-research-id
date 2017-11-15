import { connect } from 'react-redux'
import PendingList from '../components/PendingList'
import { approveResearcherID, rejectResearcherID } from '../actions/PendingListActions'

const mapStateToProps = (state, ownProps) => {
  return {
    pendingResearchers: state.registry.pending,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onApproveClick: (id) => {
      dispatch(approveResearcherID(id))
    },
    onRejectClick: (id) => {
      dispatch(rejectResearcherID(id))
    }
  }
}

const PendingListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingList)

export default PendingListContainer
