import jwtDecode from 'jwt-decode'

function getCookie (name) {
  const cookie = {}
  document.cookie.split(';').forEach((el) => {
    const [k, v] = el.split('=')
    cookie[k.trim()] = v
  })
  return cookie[name]
}

function deleteCookie (name) {
  document.cookie = `${name}= ;expires=Thu, 01 Jan 1970 00:00:01 GMT`
}

export default class SessionManager {
  isAuthenticated () {
    return this.getProfile() !== undefined
  }

  logout () {
    deleteCookie('cheetosbros-id-token')
  }

  getProfile () {
    const token = getCookie('cheetosbros-id-token')

    try {
      return jwtDecode(token)
    } catch (e) {
      return undefined
    }
  }
}
