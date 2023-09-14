import { createApp } from 'vue'

import App from './App.vue'
import {setupRouter} from "@/router";
import {setupStore} from "@/store";
import {setupPlugins} from "@/plugins";
import 'element-plus/dist/index.css';
import 'highlight.js/styles/atom-one-dark.css'
// import './style.css'
import 'animate.css'
import '@/assets/base.scss'

async function setup(){
    const app = createApp(App);
    // 加载pinia
    setupStore(app);
    // 加载路由
    setupRouter(app);
    /** 加载插件 */
    setupPlugins(app)

    app.mount('#app')
}

setup().then(() => {});
