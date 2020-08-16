import { API_HOST } from '../Constants'
import CheetosClient from '../api/cheetosClient'

export default class SessionManager {
  setToken (token) {
    window.localStorage.setItem('cheetosbros-token', token)
  }

  isAuthenticated () {
    return window.localStorage.getItem('cheetosbros-token') !== null
  }

  logout () {
    window.localStorage.removeItem('cheetosbros-token')
  }

  getClient () {
    if (!this.isAuthenticated()) {
      return undefined
    }

    const token = window.localStorage.getItem('cheetosbros-token')
    return new CheetosClient(API_HOST, token)
  }
}
