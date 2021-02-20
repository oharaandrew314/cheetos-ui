import jwtDecode from 'jwt-decode'
import { ID_TOKEN_COOKIE, API_HOST } from '../Constants'

function deleteCookie (name) {
  document.cookie = `${name}= ;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${API_HOST};`
}

export default class SessionManager {
  isAuthenticated () {
    return Boolean(this.getProfile())
  }

  login (token) {
    document.cookie = `${ID_TOKEN_COOKIE}=${token}; Path=/;`

    try {
      const profile = jwtDecode(token)
      window.localStorage.setItem('profile', JSON.stringify(profile))
    } catch (e) {
      console.log(`Error decoding token: ${e}`)
    }
  }

  logout () {
    deleteCookie(ID_TOKEN_COOKIE)
    window.localStorage.clear()
  }

  getProfile () {
    return JSON.parse(window.localStorage.getItem('profile'))
  }
}
