import { createStore ,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// import logger from 'redux-logger'
import reducers from './reducers'

const middlewares =[thunk]
if(process.env.NODE_ENV==='development'){
    const {logger} = require('redux-logger')
    middlewares.push(logger)
}
const store = createStore(reducers,composeWithDevTools(applyMiddleware(...middlewares)))

export default store