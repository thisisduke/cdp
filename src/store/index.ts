import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import user, { UserStateTypes } from './modules/user';
import permission, { PermissionStateTypes } from './modules/async-router';
import application, { ApplicationStateTypes } from './modules/application';
import getters from './getters'

export interface StateType {
  user: UserStateTypes;
  permission: PermissionStateTypes;
  application: ApplicationStateTypes;
}

export const key: InjectionKey<Store<StateType>> = Symbol();

export const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  getters,
  modules: {
    user,
    permission,
    application
  },
});

export function useStore() {
  return baseUseStore(key);
}
