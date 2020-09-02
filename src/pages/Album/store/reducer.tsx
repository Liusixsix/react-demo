import * as actionTypes from './constants'



const defaultState = {
    currentAlbum: {},
    startIndex: 0,
    totalCount: 0,
}



export default (state = defaultState, action: any) => {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENT_ALBUM:
            return { ...state, currentAlbum: action.data }
        case actionTypes.CHANGE_START_INDEX:
            return { ...state, startIndex: action.data }
        case actionTypes.CHANGE_TOTAL_COUNT:
            return { ...state, totalCount:action.data }
        default:
            return state;
    }
}