import axios from 'axios'

import User from './user'

export default class CheetosClient {
  constructor (host, token) {
    this.client = axios.create({
      baseURL: host
    })
    this.client.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${token}`
      return config
    })
  }

  async profile () {
    const resp = await this.client.get('/v1/users/profile')
    const user = resp.data

    return new User(user.id, user.displayName, user.steamUsername, user.xboxGamertag)
  }

  async games () {
    const resp = await this.client.get('/v1/games')
    return resp.data
  }
}
