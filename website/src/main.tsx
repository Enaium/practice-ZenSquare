import { createApp } from "vue"
import "bootstrap/scss/bootstrap.scss"
import App from "@/App"
import router from "@/router"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import i18n from "@/i18n"

const app = createApp(<App />)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(i18n).use(pinia).use(router)
app.mount("#app")
