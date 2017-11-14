const initialState = {
  data: null,
  isOwner: false
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED')
  {
    return Object.assign({}, state, {
      data: action.payload,
      isOwner: action.isOwner
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null,
      isOwner: false
    })
  }

  return state
}

export default userReducer
