import { http } from './config'

export const getBannerRequest = () => {
    return http.get('/banner')
}

export const getRecommendListRequest = () => {
    return http.get('/personalized')
}

//获取热门歌手
export const getHotSingerListRequest = count => {
    return http.get(`/top/artists?offset=${count}`);
};

// 歌手分类列表
export const getSingerListRequest = (category, alpha, count) => {
    return http.get(
        `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
    );
};  

//获取排行榜分类
export const getRankListRequest = () =>{
    return http.get(`/toplist/detail`)
}

// 推荐歌单详情
export const getAlbumDetailRequest = id => {
    return http.get(`/playlist/detail?id=${id}`);
  };

//获取歌曲详情
  export const getSongDetailRequest = id => {
    return http.get(`/song/detail?ids=${id}`);
  };