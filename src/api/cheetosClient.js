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
    await this.client.post('/v1/games/sync')
  }

  async games () {
    const resp = await this.client.get('/v1/games')
    return resp.data
  }
}
