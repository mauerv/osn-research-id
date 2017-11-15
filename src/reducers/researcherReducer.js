const initialState = {
  data: null,
  isOwner: false
}

const researcherReducer = (state = initialState, action) => {
  if (action.type === 'RESEARCHER_LOGGED_IN' || action.type === 'RESEARCHER_UPDATED')
  {
    return Object.assign({}, state, {
      data: action.payload,
      isOwner: action.isOwner
    })
  }

  if (action.type === 'RESEARCHER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null,
      isOwner: false
    })
  }

  return state
}

export default researcherReducer
