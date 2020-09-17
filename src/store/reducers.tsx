
import { combineReducers } from 'redux'
import { reducer as recommendReducer } from '../pages/recommend/store'
import {reducer as albumReducer } from '../pages/Album/store'
import { reducer as singersReducer } from '../pages/singers/store'
import {reducer as rankReducer} from '../pages/rank/store'
import {reducer as playReducer} from '../pages/Player/store'
import {reducer as singerInfoReducer} from '../pages/singer/store'
 
export default combineReducers({
    recommend: recommendReducer,
    singers: singersReducer,
    rank : rankReducer,
    album:albumReducer,
    play:playReducer,
    singerInfo:singerInfoReducer
})