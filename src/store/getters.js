const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  userName: state => state.user.userName,
  dsrId: state => state.user.dsrId,
  manId: state => state.user.manId,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  addRoutes: state => state.permission.addRoutes,
  routers: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
