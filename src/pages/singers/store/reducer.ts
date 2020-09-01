import * as actionTypes from './constants'

interface IdefultState {
    category: string
    alpha: string
    singerList: any[],
    listOffset: number
}

const defaultState: IdefultState = {
    category: '',
    alpha: '',
    singerList: [],
    listOffset: 0, // 请求列表的偏移不是page，是个数
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CATOGORY:
            return { ...state, category: action.data,listOffset:0 }
        case actionTypes.CHANGE_ALPHA:
            return { ...state, alpha: action.data,listOffset:0  }
        case actionTypes.CHANGE_SINGER_LIST:
            return { ...state, singerList: action.data }
        case actionTypes.CHANGE_LIST_OFFSET:
            return { ...state, listOffset: action.data }
        default:
            return state;
    }
}