
import { combineReducers } from 'redux'
import { reducer as recommendReducer } from '../pages/recommend/store'
import { reducer as singersReducer } from '../pages/singers/store'
import {reducer as rankReducer} from '../pages/rank/store'

export default combineReducers({
    recommend: recommendReducer,
    singers: singersReducer,
    rank : rankReducer
})