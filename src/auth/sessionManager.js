export default class SessionManager {
  login (profile) {
    if (!profile) throw Error('Cannot login with no profile')
    window.localStorage.setItem('cheetosbros-profile', JSON.stringify(profile))
  }

  isAuthenticated () {
    return this.getProfile() !== undefined
  }

  logout () {
    window.localStorage.removeItem('cheetosbros-profile')
  }

  getProfile () {
    const data = window.localStorage.getItem('cheetosbros-profile')
    if (!data) return undefined

    return JSON.parse(data)
  }
}
