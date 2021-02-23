import jwtDecode from 'jwt-decode'

const SESSION = 'session'
const PROFILE = 'profile'

export default class SessionManager {
  isAuthenticated () {
    return Boolean(this.getProfile())
  }

  login (token) {
    try {
      const profile = jwtDecode(token)
      window.localStorage.setItem(SESSION, token)
      window.localStorage.setItem(PROFILE, JSON.stringify(profile))
    } catch (e) {
      console.log(`Error decoding token: ${e}`)
    }
  }

  logout () {
    window.localStorage.clear()
  }

  getProfile () {
    return JSON.parse(window.localStorage.getItem(PROFILE))
  }

  getSessionToken () {
    return window.localStorage.getItem(SESSION)
  }
}
