// api
import { getApplication } from '@/api/sys/menu'
import { MutationTree,ActionTree } from 'vuex';

export interface ApplicationStateTypes {
  applicationList:Array<Record<string,unknown>>;
  applicationCode:number
}

const state: ApplicationStateTypes = {
  applicationList: [],
  applicationCode: 16
};

const mutations: MutationTree<ApplicationStateTypes>  = {
  SET_APPLICATION_LIST: (state:any, data:any) => {
    state.applicationList = data
  },
  SET_APPLICATION_CODE: (state:any, data:any) => {
    state.applicationCode = data
  }
};

const actions: ActionTree<ApplicationStateTypes, any> = {
  GetApplicationList ({ commit, state }) {
    
    return new Promise<void>(resolve => {

      getApplication().then((response:any) => {
        const result = response.result
        
        // 保存应用菜单
        commit('SET_APPLICATION_LIST', result)
        // console.log(state.applicationCode)
        // 默认值
        commit('SET_APPLICATION_CODE', state.applicationCode)
        resolve()
      })
      
    })
  },
  SetApplicationCode ({ commit }, code) {
    return new Promise<void>(resolve => {
    commit('SET_APPLICATION_CODE', code)
    commit('SET_ROLES', [])
      resolve()
    })
  }
}


const application = {
  state,
  mutations,
  actions
}

export default application
