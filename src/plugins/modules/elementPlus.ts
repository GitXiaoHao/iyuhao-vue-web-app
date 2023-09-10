import ElementPlus from "element-plus"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {App} from "vue";
export function loadElementPlus(app:App<Element>) {
    /** Element Plus 组件完整引入 */
    app.use(ElementPlus, { locale: zhCn })
    //图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
}