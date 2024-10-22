import userMap from "@/router/route/user.js";
import articleMap from "@/router/route/article.js";
const map = new Map()

// 1.主页
map.set('dashboard', {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue'),
    meta: {
        title: 'Home',
        key: '1',
        icon: 'HomeOutlined'
    }
})
// 2.用户
userMap.forEach((value, key) => map.set(key,value))
// 3.文章
articleMap.forEach((value, key) => map.set(key,value))


export default map