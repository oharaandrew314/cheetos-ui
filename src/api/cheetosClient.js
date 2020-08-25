import axios from 'axios'

import { API_HOST } from '../Constants'

export default class CheetosClient {
  constructor (host) {
    this.client = axios.create({
      baseURL: host || API_HOST,
      withCredentials: true
    })
  }

  async sync () {
    await this.client.post('/v1/sync')
  }

  async games (platform) {
    const resp = await this.client.get(`/v1/games/${platform}`)
    return resp.data
  }

  async game (platform, id) {
    const resp = await this.client.get(`/v1/games/${platform}/${id}`)
    return resp.data
  }

  async achievements (platform, id) {
    const resp = await this.client.get(`/v1/games/${platform}/${id}/achievements`)
    return resp.data
  }

  async achievementStatuses (platform, gameId, playerId) {
    const resp = await this.client.get(`/v1/games/${platform}/${gameId}/achievements/${playerId}`)
    return resp.data
  }

  async friends (platform) {
    const resp = await this.client.get(`/v1/friends/${platform}`)
    return resp.data
  }

  async getMyPlayer (platform) {
    const resp = await this.client.get(`/v1/players/me/${platform}`)
    return resp.data
  }
}

export const cheetosClient = new CheetosClient()
