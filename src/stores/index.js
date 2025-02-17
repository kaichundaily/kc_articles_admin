import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState())
export default pinia
export * from './modules/router.js'
export * from './modules/user.js'
export * from './modules/menu.js'
