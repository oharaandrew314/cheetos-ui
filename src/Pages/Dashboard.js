import React, { Component } from 'react'

import CheetosClient from '../api/cheetosClient'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.client = new CheetosClient()
    this.state = { games: [] }
  }

  async componentDidMount () {
    const { client } = this

    const games = await client.games()
    this.setState({ games })
  }

  async handleSync () {
    const { client } = this

    await client.sync()
  }

  render () {
    const { games } = this.state

    return (
      <div>
        <h2>Dashboard</h2>

        <h3>Games</h3>
        <button onClick={this.handleSync.bind(this)}>
          Sync
        </button>

        <ul>
          {games.map(game => {
            return (
              <li key={game.uuid}>
                <a href={`/games/${game.uuid}`}>
                  ({game.platform}) {game.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
