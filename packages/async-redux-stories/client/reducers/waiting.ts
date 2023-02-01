import { SHOW_ERROR, REQUEST_POSTS, RECEIVE_POSTS, Action } from '../actions/reddit'

function waiting(state = false, action: Action): boolean {
  const { type } = action

  switch (type) {
    case REQUEST_POSTS:
      return true
    case RECEIVE_POSTS:
      return false
    case SHOW_ERROR:
      return false
    default:
      return state
  }
}

export default waiting
