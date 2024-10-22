export function convertToDynamicImport(routerList) {
    return routerList.map(route => {
        // const { path, name, redirect, component, children } = route
        let  routerConfig = {
            path: route.path,
            name: route.meta.title,
            meta: route.meta,
            component: () => import(/* @vite-ignore */ route.component),
        }
        if (route.children && route.children.length > 0) {
            routerConfig.children = convertToDynamicImport(route.children)
        }
        return routerConfig
    })
}