export default class SessionManager {
  setToken (token) {
    window.localStorage.setItem('cheetosbros-token', token)
  }

  isAuthenticated (token) {
    return window.localStorage.getItem('cheetosbros-token') !== null
  }

  logout () {
    window.localStorage.removeItem('cheetosbros-token')
  }
}
