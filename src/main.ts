import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import debounceDirective from './directives/debounce'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('debounce', debounceDirective)

app.mount('#app')
