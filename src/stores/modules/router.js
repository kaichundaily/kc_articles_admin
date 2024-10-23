import { defineStore } from "pinia";
import { ref } from "vue";

export const routerStore = defineStore("router", () => {
        const routerList = ref([])
        const setRouterList = (newRouterList) => {
            routerList.value = newRouterList
        }

        const removeRouterList = () => {
            routerList.value = []
        }

        return {
            routerList,
            setRouterList,
            removeRouterList
        }
    },
    {
        persist: {
            storage: sessionStorage
        }
    }
)