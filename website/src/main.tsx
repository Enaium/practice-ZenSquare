import { createApp } from "vue"
import "@/style.css"
import App from "@/App"
import router from "@/router"
import i18n from "@/i18n"
import store from "@/store"
import { VueQueryPlugin } from "@tanstack/vue-query"

const app = createApp(<App />)

app.use(i18n).use(store).use(VueQueryPlugin).use(router)
app.mount("#app")
