import * as loginService from '@/api/login'
import router from '@/router'
import storage from 'store';
import { store } from '@/store'
import { sysRouter, dashboardRouter, dmpRouter } from './config'
import { RouteRecordRaw } from "vue-router";
import BasicLayout from '@/layouts/BasicLayout/index.vue'

interface checkRoute {
  route: RouteRecordRaw;
  flag: boolean;
}

// interface Meta {
//   title:string;
//   icon:any;

//   permission:string
// }
// interface MenuState {
//   path:string;
//   name:string;
//   component:any;
//   hidden:boolean;
//   meta:Meta;
// }

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
 export const generatorDynamicRouter = (applicationCode:number) => {
    // console.log('进入动态路由生成')
    return new Promise((resolve, reject) => {
      const routers = applicationCode == 1 ? sysRouter : ( applicationCode == 2 ? dashboardRouter : dmpRouter)
      
      resolve(routers)
      // loginService.getCurrentUserNav(applicationCode).then((res:any) => {
      //   const result = res.data.result
      //   console.log('result',result)
      //   let childrenNav:any = []
      //   listToTree(result, childrenNav, store.getters.applicationCode)
      //   // childrenNav = generator(childrenNav)
      //   console.log('childrenNav',childrenNav)
      //   const routers = rootRouter.concat(childrenNav)
      //   resolve(routers)
      // }).catch(err => {
      //   reject(err)
      // })
    })
  }

  /**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap:any,parent?:any) => {

  
  return routerMap.map((item:any) => {
    const { title, icon, hiddenHeaderContent } = item.meta || {}

    const currentRouter:RouteRecordRaw = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${parent && parent.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
     
      component:parent ? () => import('@/layouts/BasicLayout/index.vue') : BasicLayout ,
      // // 隐藏菜单
      // hidden: !item.hidden,
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: `icon-${icon}` || undefined,
        hidden: item.hidden,
        hiddenHeaderContent,
        permission: item.name
      }
    }
    // // 是否设置了隐藏菜单
    // if (show === false) {
    //   currentRouter.hidden = true
    // }
    // // 是否设置了隐藏子菜单
    // if (hideChildren) {
    //   currentRouter.hideChildrenInMenu = true
    // }
    // // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    // if (!currentRouter.path.startsWith('http')) {
    //   currentRouter.path = currentRouter.path.replace('//', '/')
    // }
    // // // 重定向
    // item.redirect && (currentRouter.redirect = item.redirect)
    // // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}

  /**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list:any, tree:any, parentId:number | string) => {

  list.forEach((item:any) => {
    // 判断是否为父级菜单
    if (item.parentId === Number(parentId)) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}


// 判断是否存在已添加的路由
export const hasRoute = (to: any): boolean => {
  let flag = true;
  router.getRoutes().map((item: any) => {
    // 判断是否存在动态路由
    if (item.path.indexOf("/:") != -1) {
      if (to.path.indexOf(item.path.substr(0, item.path.indexOf("/:"))) != -1) {
        flag = false;
      }
    } else {
      if (item.path == to.path) {
        flag = false;
      }
    }
  });

  return flag;
};


// 返回当前需要跳转的路由对象
export const generateRoute = (to: any, list: Array<any>): checkRoute => {
  console.log('list',list)
  let index = 0;
  let flag = false;
  const toArr: string = to.path.substr(0, to.path.indexOf("/", 1));
  list.map((item: any, i: number) => {
    if (item.path == toArr) {
      item.children.map((v: any) => {
        // 判断是否有动态路由
        if (v.path.indexOf("/:") != -1) {
          if (to.path.indexOf(`${toArr}/${v.path.substr(0, v.path.indexOf("/:"))}`) != -1) {
            index = i;
            flag = true;
          }
        } else {
          if (to.path == `${toArr}/${v.path}`) {
            index = i;
            flag = true;
          }
        }
      });
    }
  });

  return { route: list[index], flag };
};
