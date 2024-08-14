import { defineStore } from "pinia";
import { ref, watch } from 'vue'


export const useUserStore = defineStore("users", () => {
        // 1. token相关内容
        const token = ref(localStorage.getItem('token') || '')
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
        // 手动持久化
        watch(token, (newToken) => {
            if (newToken) {
                localStorage.setItem('token', newToken)
            } else {
                localStorage.removeItem('token')
            }
        })

        return {
            token,
            setToken,
            removeToken,
            userInfo,
            setUserInfo
        }
    },
    // 设置持久化保存
    // {
    //     persist: true,
    //     strategies: [
    //         {
    //             // persist: true,
    //             key: 'token',
    //             storage: localStorage,
    //             path: ['token'],
    //         }
    //     ]
    // }
)
