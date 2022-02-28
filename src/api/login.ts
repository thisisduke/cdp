import service from '@/service'

const userApi = {
  Login: '/sys/user/login',
  Logout: '/auth/logout',
  UserInfo: '/sys/user/info',
  UserMenu: '/sys/menu/nav'
}
/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
 export function login (parameter:any) {
    return service({
      url: userApi.Login,
      method: 'post',
      data: parameter
    })
  }
  

export function getInfo () {
    return service({
        url: userApi.UserInfo,
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}


export function getCurrentUserNav (id:string | number) {
  // console.log('进入请求后台路由数据')
  return service({
    url: userApi.UserMenu + `/${id}`,
    method: 'get'
  })
}

export function logout () {
    return service({
      url: userApi.Logout,
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }