import Axios from "./request";

// 归档，获取全部文章列表
export const getArticlesFe = (params) => {
    return Axios({
        method: 'get',
        url: '/article/getarticlesfe',
        params
    })
}

// 获取文章数量
export const getArticlesCountFe = () => {
    return Axios({
        method: 'get',
        url: '/article/getarticlescountfe'
    })
}

// 获取分类以及分类的数量
export const getArtCates = () => {
    return Axios({
        method: "get",
        url: "/article/getartcates"
    });
};

// 获取标签以及标签的数量
export const getArtTags = () => {
    return Axios({
        method: "get",
        url: "/article/getarttags"
    });
};

// 获取分类id对应的所有文章
export const getCateArticleList = (params) => {
    return Axios({
        method: 'get',
        url: '/artcate/getcatearticlelist',
        params
    })
}
// 获取标签id对应的所有文章
export const getTagArticleList = (params) => {
    return Axios({
        method: 'get',
        url: '/arttag/gettagarticlelist',
        params
    })
}
