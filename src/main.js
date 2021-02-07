import { createApp } from 'vue';
import App from './App.vue'
import vuex from './store/index'
import vPopover from '@/components/public/lp-popover/lp-popover'
import { lazyLoad as vLazyLoad } from '@/use/trackImg'

const app = createApp(App)

// 注册自定义指令 v-popver
vPopover(app)
vLazyLoad(app)

app.use(vuex).mount('#app')
