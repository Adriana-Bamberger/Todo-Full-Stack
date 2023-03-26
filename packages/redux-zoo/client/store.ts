import { legacy_createStore as createStore } from 'redux'
import { devToolsEnhancer } from '@redux-devtools/extension'

import reducers from './reducers'

const store = createStore(reducers, devToolsEnhancer())
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }
