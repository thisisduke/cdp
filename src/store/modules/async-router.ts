/**
 * 向后端请求用户的菜单，动态生成路由
 */

 import { MutationTree,ActionTree } from 'vuex';
 import { RouteRecordRaw } from "vue-router";

 import { generatorDynamicRouter } from '@/router/generator-routers'

export interface PermissionStateTypes {
  addRoute: RouteRecordRaw[],
}

const state: PermissionStateTypes = {
  addRoute: [],
};

const mutations: MutationTree<PermissionStateTypes>  = {
  SET_ROUTERS: (state:any, routers:RouteRecordRaw[]) => {
    state.addRoute = routers
    
  }
};

const actions: ActionTree<PermissionStateTypes, any> = {
  GenerateRoutes ({ commit }, data) {
    return new Promise<void>(resolve => {
      const { applicationCode } = data
      
      generatorDynamicRouter(applicationCode).then((routers:any) => {
        commit('SET_ROUTERS', routers)
        resolve(routers)
      })
    })
  }
}

const permission = {
  state,
  mutations,
  actions,
}

export default permission
