import * as actionTypes from './constants'

interface defaultState {
    bannerList: any[],
    recommendList: any[],
    enterLoading: boolean
}


const defaultState: defaultState = {
    bannerList: [],
    recommendList: [],
    enterLoading: true
}



export default (state = defaultState, action: any) => {
    switch (action.type) {
        case actionTypes.CHANGE_BANNER:
            return { ...state, bannerList: action.data }
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return { ...state, recommendList: action.data }
        case actionTypes.CHANGE_ENTER_LOADING:
            return { ...state, ...action.data }
        default:
            return state;
    }
}