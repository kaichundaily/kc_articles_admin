import { useUserStore } from "@/stores/index.js";
import axios from "axios";
import router from '@/router';
import { message } from "ant-design-vue";

const baseURL = import.meta.env.VITE_APP_API_URL;
const instance = axios.create({
    baseURL,
    timeout: 100000,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(
    (config) => {
        const userStore = useUserStore()
        if (userStore.token) {
            config.headers.Authorization = userStore.token
        }
        return config
    },
    (err) => Promise.reject(err)
)

instance.interceptors.response.use(
    (res) => {
        // console.log(res)
        if (res.data.Code === 200) {
            return res.data
        }
        message.error({ message: res.data.Message || '服务异常', type: 'error' })
        return Promise.reject(res.data)
    },
    (err) => {
        message.error({ message: err.response.data.Message || '服务异常', type: 'error' })
        if (err.response?.status === 401) {
            router.push('/login')
        }
        return Promise.reject(err)
    }
)

export default instance
export { baseURL }
