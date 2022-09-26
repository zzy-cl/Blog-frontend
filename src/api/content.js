import Axios from "./request";

// 获取文章列表
export const getArticlesFe = (params) => {
    return Axios({
        method: 'get',
        url: '/article/getarticlesfe',
        params
    })
}

// 获取文章详细内容
export const getArticleinfo = (filename) => {
    return Axios({
        method: 'get',
        url: `${filename}`,
    })
}

// 获取文章对应的标签名
export const getArticleTagsFe = (params) => {
    return Axios({
        method: 'get',
        url: '/article/getarticletagsfe',
        params
    })
}

// 通过文章id获取对应的详细内容
export const getArticlesFeInfo = (params) => {
    return Axios({
        method: 'get',
        url: '/article/getarticlesfeinfo',
        params
    })
}
