import { defineStore } from "pinia";
import { ref } from 'vue'


export const useRouterStore = defineStore("router", () => {
        // 1. token相关内容
        const  isAddRouter = ref(false)
        const commitRouter = (newRouter) => {
            isAddRouter.value = newRouter
        }

        return {
            isAddRouter,
            commitRouter,
        }
    }
)
