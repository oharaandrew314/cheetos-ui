export default class SessionManager {
  setToken (token, displayName) {
    window.localStorage.setItem('cheetosbros-token', token)
    window.localStorage.setItem('cheetosbros-displayName', displayName)
  }

  isAuthenticated (token) {
    return window.localStorage.getItem('cheetosbros-token') !== null
  }

  logout () {
    window.localStorage.removeItem('cheetosbros-token')
    window.localStorage.removeItem('cheetosbros-displayName')
  }

  getCurrentDisplayName () {
    return window.localStorage.getItem('cheetosbros-displayName')
  }
}
