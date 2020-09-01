import { CHANGE_CATOGORY, CHANGE_ALPHA, CHANGE_SINGER_LIST, CHANGE_LIST_OFFSET } from './constants'
import { getSingerListRequest, getHotSingerListRequest } from '../../../api/request'


export const changeCategory = (data) => ({
    type: CHANGE_CATOGORY,
    data
})

export const changeAlpha = (data) => ({
    type: CHANGE_ALPHA,
    data
})

export const changeSingerList = (data) => ({
    type: CHANGE_SINGER_LIST,
    data
})

export const changeListOffset = (data) => ({
    type: CHANGE_LIST_OFFSET,
    data
});



export const getHotSingerList = () => {
    return (dispatch) => {
        getHotSingerListRequest(0).then((res: any) => {
            const data = res.artists
            dispatch(changeSingerList(data))
            dispatch(changeListOffset(data.length))
        }).catch(e => {
            console.log('热门格式数据获取失败')
        })
    }
}


// 没有选择时的加载更多
export const refreshMoreHotSingerList = () => {
    return (dispath, getState) => {
        const offset = getState().singers.listOffset
        const singerList = getState().singers.singerList
        getHotSingerListRequest(offset).then((res: any) => {
            const data = [...singerList, ...res.artists]
            dispath(changeSingerList(data))
            dispath(changeListOffset(data.length))
        })
    }
}

export const getSingerList = () => {
    return (dispatch, getState) => {
        const offset = getState().singers.listOffset
        const category = getState().singers.category
        const alpha = getState().singers.alpha
        getSingerListRequest(category, alpha, offset).then((res: any) => {
            const data = res.artists
            dispatch(changeSingerList(data))
            dispatch(changeListOffset(data.length))
        })
    }
}



// 选中时候 加载更多
export const refreshMoreSingerList = () => {
    return (dispatch, getState) => {
        const category = getState().singers.category
        const alpha = getState().singers.alpha
        const singerList = getState().singers.singerList
        const offset = getState().singers.listOffset
        getSingerListRequest(category, alpha, offset).then((res: any) => {
            const data = [...singerList, ...res.artists];
            dispatch(changeSingerList(data))
            dispatch(changeListOffset(data.length))
        })
    }
}