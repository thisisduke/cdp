const getters = {
  token: (state:any) => state.user.token,
  avatar: (state:any) => state.user.avatar,
  username: (state:any) => state.user.name,
  roles: (state:any) => state.user.roles,
  userInfo: (state:any) => state.user.info,
  
  //路由
  addRoute: (state:any) => state.permission.addRoute,

  //应用菜单
  applicationList: (state:any) => state.application.applicationList,
  applicationCode: (state:any) => state.application.applicationCode,

}

export default getters
