import { defineStore } from "pinia";
import { ref } from 'vue'


export const useMenuStore = defineStore("menus", () => {
        const menuList = ref([])
        const setMenuList = (newMenuList) => {
            menuList.value = newMenuList
        }
        const removeMenuList = () => {
            menuList.value = []
        }

        return {
            menuList,
            setMenuList,
            removeMenuList,
        }
    },
    // 设置持久化保存
    {
        persist: true
    }
)
