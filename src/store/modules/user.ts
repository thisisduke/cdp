import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { Module } from 'vuex'
import { login, getInfo, logout} from '@/api/login'
import { MutationTree,ActionTree } from 'vuex';


export interface UserStateTypes {
    token:string;
    name:string;
    avatar:string;
    roles:Array<Record<string,unknown>>;
    info:Record<string,unknown>;
}

const state: UserStateTypes = {
    token: '',
    name: '',
    avatar: '',
    roles: [],
    info: {}
  };
  
const mutations: MutationTree<UserStateTypes>  = {
    SET_TOKEN: (state:UserStateTypes, token:string)=>{
        state.token = token
    },
    SET_NAME: (state:UserStateTypes, name:string) => {
        state.name = name
    },
    SET_AVATAR: (state:UserStateTypes, avatar:string) => {
        state.avatar = avatar
    },
    SET_ROLES: (state:UserStateTypes, roles:Array<Record<string,unknown>>) => {
        state.roles = roles
    },
    SET_INFO: (state:UserStateTypes, info:Record<string,unknown>) => {
        state.info = info
    }
};

const actions: ActionTree<UserStateTypes, any> = {
    // 登录
    Login ({ commit }, userInfo) {
        
        return new Promise<void>((resolve, reject) => {
            login(userInfo).then((response:any) => {
                const result = response.result
                storage.set(ACCESS_TOKEN, result)
                commit('SET_TOKEN', result)
                resolve()
            }).catch((error:Response) => {
                reject(error)
            })
        })
    },
    // 获取用户信息
    GetInfo ({ commit }) {
        return new Promise<void>((resolve, reject) => {
          getInfo().then((response:any) => {
            const result = response.result
            
            if (result.role && result.role.permissions.length > 0) {
              const role = result.role
              role.permissions = result.role.permissions
              role.permissions.map((per:any) => {
                if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                  const action = per.actionEntitySet.map((action:any) => { return action.action })
                  per.actionList = action
                }
              })
              role.permissionList = role.permissions.map((permission:any) => { return permission.permissionId })
              commit('SET_ROLES', result.role)
              commit('SET_INFO', result)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }
  
            commit('SET_NAME', { name: result.name }) 
            commit('SET_AVATAR', result.avatar)
  
            resolve(response)
          }).catch((error:Response) => {
            reject(error)
          })
        })
      },
  
      // 登出
      Logout ({ commit, state }) {
        return new Promise<void>((resolve) => {
          logout().then(() => {
            resolve()
          }).catch(() => {
            resolve()
          }).finally(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            storage.remove(ACCESS_TOKEN)
          })
        })
      }
};

const userModules:Module<UserStateTypes,any> = {
    namespaced:process.env.NODE_ENV !== 'production',
    state,
    mutations,
    actions
}
export default userModules
