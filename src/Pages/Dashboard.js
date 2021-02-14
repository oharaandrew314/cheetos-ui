import React, { Component } from 'react'

import GamesList from '../Components/GamesList'
import { cheetosClient } from '../api/cheetosClient'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = { platform: 'Steam' }
  }

  async handleSync () {
    const { platform } = this.state
    await cheetosClient.syncPlatform(platform)
  }

  handlePlatformChange (event) {
    const platform = event.target.value
    this.setState({ platform })
  }

  render () {
    const { profile } = this.props
    const { platform } = this.state

    const platforms = []
    if (profile.steamId) platforms.push('Steam')
    if (profile.xboxId) platforms.push('Xbox')

    return (
      <div>
        <h3>
          Dashboard
        </h3>

        <button onClick={this.handleSync.bind(this)}>
          Sync
        </button>

        <select value={platform} onChange={this.handlePlatformChange.bind(this)}>
          {platforms.map(p => {
            return (<option value={p} key={p}>{p}</option>)
          })}
        </select>

        <GamesList platform={platform} />
      </div>
    )
  }
}