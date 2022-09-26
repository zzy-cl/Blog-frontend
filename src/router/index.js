import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'HomePage',
            redirect: '/contentlist',
            component: () => import('../views/homepage/HomePage.vue'),
            children: [
                {
                    path: '/contentlist', // 文章列表
                    name: 'ContentList',
                    // redirect: '/',
                    component: () => import('../views/homepage/ContentList.vue')
                },
                {
                    path: '/album', // 相册
                    name: 'AlbumList',
                    // redirect: '/',
                    component: () => import('../views/album/AlbumList.vue')
                },
                {
                    path: '/picture/:id', // 文章内容
                    name: 'PictureList',
                    // redirect: '/',
                    component: () => import('../views/album/PictureList.vue')
                },
                {
                    path: '/incomplete', // 待办
                    name: 'InComplete',
                    // redirect: '/',
                    component: () => import('../views/incomplete/InComplete.vue')
                },
                {
                    path: '/file', // 归档
                    name: 'FilePage',
                    // redirect: '/',
                    component: () => import('../views/filecatetag/FilePage.vue')
                },
                {
                    path: '/cate', // 分类
                    name: 'CatePage',
                    // redirect: '/',
                    component: () => import('../views/filecatetag/CatePage.vue')
                },
                {
                    path: '/tag', // 标签
                    name: 'TagPage',
                    // redirect: '/',
                    component: () => import('../views/filecatetag/TagPage.vue')
                },
                {
                    path: '/drama', // 标签
                    name: 'DramaPage',
                    // redirect: '/',
                    component: () => import('../views/drama/DramaPage.vue')
                },
            ]
        },

        {
            path: '/contentinfo/:article_id',
            name: 'ContentInfo',
            // redirect: '/',
            component: () => import('../views/content/ContentInfo.vue')
        },
        {
            path: '/test',
            name: 'TestPage',
            // redirect: '/',
            component: () => import('../components/TestPage.vue')
        }
    ]
})

export default router
