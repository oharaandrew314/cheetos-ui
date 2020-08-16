import { API_HOST } from '../Constants'
import CheetosClient from '../api/cheetosClient'

export default class SessionManager {
  async init () {
    const token = window.localStorage.getItem('cheetosbros-token')

    if (token) {
      await this.login(token)
    }
  }

  async login (token) {
    const client = new CheetosClient(API_HOST, token)

    this.profile = await client.profile()
    window.localStorage.setItem('cheetosbros-token', token)
    this.client = client
  }

  isAuthenticated () {
    return this.client !== undefined && this.profile !== undefined
  }

  logout () {
    window.localStorage.removeItem('cheetosbros-token')
    this.client = undefined
    this.profile = undefined
  }

  getClient () {
    return this.client
  }

  getProfile () {
    return this.profile
  }
}
