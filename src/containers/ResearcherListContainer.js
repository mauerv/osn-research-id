import { connect } from 'react-redux'
import ResearcherList from '../components/ResearcherList'
import { removeResearcherID } from '../actions/ResearcherListActions'

const mapStateToProps = (state, ownProps) => {
  return {
    researchers: state.registry.researchers,
    isOwner: state.researcher.isOwner
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick: (id) => {
      dispatch(removeResearcherID(id))
    }
  }
}

const ResearcherListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResearcherList)

export default ResearcherListContainer
