import { createApp } from "vue"
import "@/style.css"
import App from "@/App"
import index from "@/router"

createApp(<App />)
  .use(index)
  .mount("#app")
