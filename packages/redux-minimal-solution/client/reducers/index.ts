import { combineReducers } from 'redux'

import wombatsReducer from './wombats'

const reducer = combineReducers({
  wombats: wombatsReducer,
})

export default reducer
