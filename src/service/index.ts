import storage from 'store'
import { store } from '@/store'
import Axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { message, notification } from 'ant-design-vue';
import { ACCESS_TOKEN } from '@/store/mutation-types'

import router from "../router";

interface PendingType {
  url: string | undefined;
  method: Method | undefined;
  params: Record<string, unknown> | undefined;
  data: Array<string>  | undefined;
  cancel: () => void;
}

const service = Axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 30000,
});

Axios.defaults.withCredentials = true;
Axios.defaults.headers.common["Content-Type"] = "application/json";


// 取消重复请求
const pending: Array<PendingType> = [];

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key;
    const list: PendingType = pending[key];
    // 当前请求在数组中存在时执行函数体
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel();
      // 从数组中移除记录
      pending.splice(item, 1);
    }
  }
};

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
   
    const token = storage.get(ACCESS_TOKEN)
    if (token) {
      config.headers['Access-Token'] = token
    }
    
    return config;
  },
  (error: any) => {
    console.log(error);
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  // 请求成功
  (response: AxiosResponse) => {
    removePending(response.config);
    return response.data;
  },
  // 请求失败
  (error: any) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      const response = error.response;
      const token = storage.get(ACCESS_TOKEN)
      // 根据返回的code值来做不同的处理(和后端约定)
      switch (response?.status) {
        case 401:
          notification.error({
            message: 'Unauthorized',
            description: 'Authorization verification failed'
          })
          if (token) {
            store.dispatch('Logout').then(() => {
              setTimeout(() => {
                location.reload();
              }, 1500)
            })
          }
          break;
        case 403:
          // 没有权限
          router.push("/user/login");
          notification.error({
            message: 'Forbidden',
            description: response.data.message
          })
          break;
        default:
          break;
      }
      // 超时重新请求
      const config = error.config;
      // 全局的请求次数,请求的间隙
      const [RETRY_COUNT, RETRY_DELAY] = [0, 1000];

      if (config && RETRY_COUNT) {
        // 设置用于跟踪重试计数的变量
        config.__retryCount = config.__retryCount || 3;
        // 检查是否已经把重试的总数用完
        if (config.__retryCount >= RETRY_COUNT) {
          return Promise.reject(response || { message: error.message });
        }
        // 增加重试计数
        config.__retryCount++;
        // 创造新的Promise来处理指数后退
        const backoff = new Promise((resolve: any) => {
          setTimeout(() => {
            resolve();
          }, RETRY_DELAY || 1);
        });
        // instance重试请求的Promise
        return backoff.then(() => {
          return service(config);
        });
      }

      // eslint-disable-next-line
        return Promise.reject(response || {message: error.message});
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明

      message.warn("网络连接异常,请稍后再试!");
    }
  }
);

export default service;
