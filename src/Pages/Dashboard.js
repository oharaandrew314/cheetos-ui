import React, { Component, Profiler } from 'react'

import GamesList from '../Components/GamesList'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = { platform: 'Steam' }
  }

  async handleSync () {
    const { client } = this

    await client.sync()
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
        <h2>Dashboard</h2>

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
