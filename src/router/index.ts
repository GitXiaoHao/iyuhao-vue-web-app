//
// @/rabbit/router/index.ts
// 路由设计
// createRouter 创建router实例对象
// createWebHashHistory 创建history模式的路由
//

import {createRouter, createWebHashHistory, RouteLocationNormalized, Router} from "vue-router";
import type {App} from 'vue';



const constantRoutes = [

]




export const router: Router = new createRouter({
    routes: constantRoutes,
    history: createWebHashHistory(),
    linkActiveClass: 'active',
})
const defaultTitle = 'home';


router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
    //是否有token
    document.title = to.meta.title ? to.meta.title : defaultTitle;
    if (to.path == '/login') {
        return next()
    }

    next()
})


// config router
export function setupRouter(app: App<Element>) {
    app.use(router);
}
