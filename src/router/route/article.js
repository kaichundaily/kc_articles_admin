const articleMap = new Map()

import { h } from 'vue'
import { SnippetsOutlined } from "@ant-design/icons-vue";

// 3.文章页
articleMap.set('article', {
    path: '/article',
    name: 'article',
    meta: {
        title: '文章',
        key: '3',
        icon: h(SnippetsOutlined)
    },
    children: Array()
})

// 3.1 文章列表
articleMap.set('articleTable', {
    path: '/article/articleTable',
    name: 'articleTable',
    component: () => import('@/views/article/ArticleTable.vue'),
    meta: {
        title: '文章列表',
        key: '3.1',
        icon: '',
        level: 'article'
    }
})


export default articleMap