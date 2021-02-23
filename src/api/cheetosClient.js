import axios from 'axios'

import { API_HOST } from '../Constants'
import SessionManager from '../auth/sessionManager'

export default class CheetosClient {
  constructor (host) {
    const session = new SessionManager()
    this.client = axios.create({
      baseURL: host || API_HOST,
      headers: {
        Authorization: `Bearer ${session.getSessionToken()}`
      }
    })
  }

  async sync () {
    await this.client.post('/v1/sync')
  }

  async games () {
    const resp = await this.client.get('/v1/games')
    return resp.data
  }

  async game (platform, gameId) {
    const resp = await this.client.get(`/v1/games/${platform}/${gameId}`)
    return resp.data
  }

  async achievements (platform, gameId) {
    const resp = await this.client.get(`/v1/games/${platform}/${gameId}/achievements`)
    return resp.data
  }

  async achievementStatuses (platform, gameId) {
    const resp = await this.client.get(`/v1/games/${platform}/${gameId}/achievements/status`)
    return resp.data
  }
}
