
// 根据路由的key值进行从小到大排序

export const routeSort = (routerList) => {
    return routerList.sort((a, b) => {
        // 将值转化为float
        const keyA = parseFloat(a.meta.key)
        const keyB = parseFloat(b.meta.key)
        // 如果有a,b都有key值，则比较，否则返回0
        if (!isNaN(keyA) && !isNaN(keyB)) {
            return keyA - keyB
        }
        // a有key值，b没有key值，则返回-1
        if (!isNaN(keyA)) {
            return -1
        }
        // b有key值，a没有key值，则返回1
        if (!isNaN(keyB)) {
            return 1
        }
        return 0
    })
}


export const processRouteList = (rouList) => {
    const routerList  = []
    rouList.forEach(item => {
        if (item.meta.icon) {
            routerList.push(item)
        }
    })
    return routerList
}