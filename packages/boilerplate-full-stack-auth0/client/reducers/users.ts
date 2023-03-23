import { CLEAR_USERS, SET_USERS, UserAction } from '../actions/user'
import { User } from '../../models/user'

const initialState = [] as User[]

function reducer(state = initialState, action: UserAction) {
  switch (action.type) {
    case SET_USERS:
      return action.payload
    case CLEAR_USERS:
      return []
    default:
      return state
  }
}

export default reducer
