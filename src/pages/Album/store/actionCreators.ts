import * as actionTypes from './constants'
import { getAlbumDetailRequest } from '../../../api/request'

export const changeCurrentAlbum = (data) => ({
    type: actionTypes.CHANGE_CURRENT_ALBUM,
    data
})


export const changeStartIndex = (data) => ({
    type: actionTypes.CHANGE_START_INDEX,
    data
})


export const changeTotalCount = (data) => ({
    type: actionTypes.CHANGE_TOTAL_COUNT,
    data
})


export const getAlbumList = (id)=>{
    return dispatch =>{
        getAlbumDetailRequest(id).then((res:any)=>{
            let data = res.playlist;
            dispatch(changeCurrentAlbum(data));
            dispatch(changeStartIndex(0));
            dispatch(changeTotalCount(data.tracks.length))
        }).catch(() => {
            console.log("获取album数据失败!")
          })
    }
}