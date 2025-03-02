import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './assets/tailwind.css'; // Import Tailwind CSS

loadFonts()

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
