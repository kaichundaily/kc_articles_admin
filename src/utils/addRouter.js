import map from "@/router/routes.js";
export const convertToDynamicImport = (routerList) => {
    let routers = new Map()
    routerList.forEach((item, index) => {
        if (item.level === "one") {
            routers.set(item.name, map.get(item.name))
        } else {
            routers.get(item.type).children.push(map.get(item.name))
        }
    })
    return routers
}