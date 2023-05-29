// This file has already been configured
import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './slices'
export function initialiseStore() {
  return configureStore({
    // You don't need to change anything here - add your reducers to client/slices/index.ts
    reducer: rootReducer,
  })
}

export const store = initialiseStore()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
