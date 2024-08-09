import { defineStore } from "pinia";
import { ref } from 'vue'


export const useUserStore = defineStore("users", () => {
        // 1. token相关内容
        const token = ref('')
        // 2. 设置token
        const setToken = (newToken) => {
            token.value = newToken
        }
        // 3. 清除token
        const removeToken = () => {
            token.value = ''
        }

        return {
            token,
            setToken,
            removeToken
        }
    },
    // 设置持久化保存
    {
        persist: true
    }
)
