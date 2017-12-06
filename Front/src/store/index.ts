import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable'
import epics from '../epics'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const epicMiddleware = createEpicMiddleware(epics)
export function configureStore (preloadState: any = {}) {
  const store = createStore(
    reducers,
    preloadState,
    composeWithDevTools(
      applyMiddleware(thunk, logger, epicMiddleware,)
     // (window as any).devToolsExtension && (window as any).devToolsExtension()
    )
  )

  return store;
}
export default configureStore