import * as actionTypes from './constants'
import { getBannerRequest ,getRecommendListRequest } from '../../../api/request'

export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data
})

export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data
})

export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})

export const getBannerList = () => {
    return (dispatch) => {
        getBannerRequest().then((data:any) => {
            const action = changeBannerList(data.banners)
            dispatch(action)
        }).catch(() => {
            console.log('获取轮播图错误')
        })
    }
}


export const getRecommendList = () =>{
    return (dispatch) => {
        getRecommendListRequest().then((data:any)=>{
            dispatch(changeRecommendList(data.result))
        }).catch(()=>{
            console.log('推荐歌单数据错误')
        })
    }
}