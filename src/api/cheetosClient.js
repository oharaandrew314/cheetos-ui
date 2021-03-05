import axios from 'axios'

import { API_HOST } from '../Constants'
import SessionManager from '../auth/sessionManager'

import Game from './game'
import Achievement from './achievement'

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
    return resp.data.map(game => new Game(game.uid, game.name, game.displayImage, game.achievementsCurrent, game.achievementsTotal, game.lastUpdated))
  }

  async game (platform, gameId) {
    const resp = await this.client.get(`/v1/games/${platform}/${gameId}`)
    const game = resp.data
    return new Game(game.uid, game.name, game.displayImage, game.achievementsCurrent, game.achievementsTotal, game.lastUpdated)
  }

  async achievements (platform, gameId) {
    const resp = await this.client.get(`/v1/games/${platform}/${gameId}/achievements`)
    console.log(resp.data)
    return resp.data.map(a => new Achievement(a.id, a.name, a.description, a.hidden, a.icons, a.score, a.unlockedOn, a.unlocked))
  }
}
