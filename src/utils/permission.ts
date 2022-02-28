import storage from 'store'
import router from '@/router'
import NProgress from "nprogress";

import { store } from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'

import "nprogress/nprogress.css";


const loginRoutePath = '/user/login'

/*vue是单页应用，刷新时，重新创建实例，需要重新加载的动态路由，不然匹配不到路由，出现页面空白的情况*/
router.beforeEach(async(to, from, next) => {
    NProgress.start();
    to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))

    if (storage.get(ACCESS_TOKEN)) {
      if (to.path == loginRoutePath || to.path == '/' ) {
        NProgress.done();
        next()
      } else {
        const hasRoles = store.getters.roles && store.getters.roles.length > 0
      
        if (hasRoles) { //判断是否刷新页面
            next()
        }else{
            await store.dispatch('user/GetInfo')
            await store.dispatch('GetApplicationList')
            const accessRoute = await store.dispatch('GenerateRoutes', { applicationCode: store.getters.applicationCode })   
            // console.log('accessRoute',accessRoute)
            accessRoute.map((item: any, i: number) => {
                router.addRoute(item);
            })
            next() /* 注意:路由匹配是在router.addRoutes之前完成的，所以，即便使用router.addRoute添加动态路由，也会出现to.matched.length也会等于0的情况，即没匹配到路由，所以to.matched.length等于0的情况下，再次执行router.push(to.path)，这样，再次触发beforeEach函数调用)*/
            // console.log('to.matched',to.matched)
            if (to.matched.length == 0) {
              router.push(to.path);//再次触发beforeEach函数调用
            }
        }
      } 
    }  else {
      if (to.matched.length != 0 && !to.meta.requireAuth) {
        NProgress.done();
        next()
      } else {
          next({
              path: '/user/login'
          })
      }
    }
  });
  
  router.afterEach(() => {
    NProgress.done();
  });


  