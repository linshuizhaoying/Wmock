import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'
import { createEpicMiddleware } from 'redux-observable'
import epics from '../epics'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const epicMiddleware = createEpicMiddleware(epics)
export function configureStore (preloadState: any = {}) {
  const store = createStore(
    reducers,
    preloadState,
    compose(
      applyMiddleware(thunk, logger, epicMiddleware,),
      (window as any).devToolsExtension && (window as any).devToolsExtension()
    )
  )

  return store;
}
export default configureStore