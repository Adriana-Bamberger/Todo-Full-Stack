/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import type { ThunkDispatch, ThunkAction } from 'redux-thunk'
import reducers from './reducers'
import type { Action } from './actions/index'
import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, never, Action>
export type AppThunkAction<T = unknown> = ThunkAction<
  Promise<T>,
  RootState,
  never,
  Action
>

export default store
