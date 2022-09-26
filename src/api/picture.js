import Axios from "./request";

// 获取文章列表
export const getAlbumPictureList = (params) => {
    return Axios({
        method: 'get',
        url: '/picture/getalbumpicturelist',
        params
    })
}

// 获取文章列表
export const getAlbumsList = () => {
    return Axios({
        method: 'get',
        url: '/picture/getalbumslist'
    })
}
