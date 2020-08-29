import { http } from './config'

export const getBannerRequest = () => {
    return http.get('/banner')
}

export const getRecommendListRequest = () =>{
    return http.get('/personalized')
}