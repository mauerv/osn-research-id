import { connect } from 'react-redux'
import PendingList from '../components/PendingList'
import { approveResearcherID } from '../actions/PendingListActions'

const mapStateToProps = (state, ownProps) => {
  return {
    pendingResearchers: state.registry.pending,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick: (id) => {
      dispatch(approveResearcherID(id))
    }
  }
}

const PendingListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingList)

export default PendingListContainer
