import React, { Component } from 'react'

import { cheetosClient } from '../api/cheetosClient'

export default class GamesList extends Component {
  constructor (props) {
    super(props)
    this.state = { games: undefined }
  }

  async componentDidMount () {
    this.update()
  }

  componentDidUpdate (prevProps) {
    const { platform } = this.props
    if (platform === prevProps.platform) return

    this.setState({ games: undefined })
    this.update()
  }

  async update () {
    const { platform } = this.props
    const games = await cheetosClient.games(platform)
    this.setState({ games })
  }

  render () {
    const { platform } = this.props
    const { games } = this.state

    if (games === undefined) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    if (games.length === 0) {
      return (
        <div>
          You have no ${platform} games :(
        </div>
      )
    }

    return (
      <div>
        <ul>
          {games.map(game => {
            return (
              <li key={`${game.platform}-${game.id}`}>
                <a href={`/games/${game.platform}/${game.id}`}>
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
