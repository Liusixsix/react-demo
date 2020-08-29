import axios from 'axios'

export const baseURL: string = 'http://47.114.141.217:3000'

const http = axios.create({
    baseURL
})

http.interceptors.response.use((res) => res.data, err => {
    return Promise.reject(err)
})

export { http }