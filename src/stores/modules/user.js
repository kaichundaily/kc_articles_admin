import { defineStore } from "pinia";
import { ref } from 'vue'


export const useUserStore = defineStore("users", () => {
        // 1. token相关内容
        const token = ref('')
        // 1.1. 设置token
        const setToken = (newToken) => {
            token.value = newToken
        }
        // 1.2. 清除token
        const removeToken = () => {
            token.value = ''
        }

        // 2. avatar相关
        const userInfo = ref({})

        // 2.2 设置avatar
        const setUserInfo = (newUserInfo) => {
            userInfo.value = newUserInfo
        }

        return {
            token,
            setToken,
            removeToken,
            userInfo,
            setUserInfo
        }
    },
    // 设置持久化保存
    {
        persist: true,
        strategies: [
            {
                key: 'token',
                storage: localStorage,
                path: ['token']
            }
        ]
    }
)
