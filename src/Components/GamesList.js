import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'

import { cheetosClient } from '../api/cheetosClient'

export default class GamesList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      games: undefined,
      displayed: []
    }
  }

  async componentDidMount () {
    await this.update()
  }

  async update () {
    const games = await cheetosClient.games()
    this.setState({ games, displayed: games })
  }

  render () {
    const { games, displayed } = this.state

    const onSearchUpdate = (event) => {
      const { games } = this.state
      const value = event.target.value

      const displayed = games
        .filter(game => game.name.toLowerCase().includes(value.toLowerCase()))

      this.setState({ displayed })
    }

    const getContent = () => {
      if (games === undefined) {
        return <div>Loading...</div>
      }
      if (games.length === 0) {
        return <div>You have no games :(</div>
      }
      if (displayed.length === 0) {
        return <div>No games found</div>
      }

      return (
        <ul>
          {displayed.map(game => {
            return (
              <li key={`${game.platform}-${game.id}`}>
                <a href={`/games/${game.platform}/${game.id}`}>
                  ({game.platform}) {game.name}
                </a>
              </li>
            )
          })}
        </ul>
      )
    }

    return (
      <div>
        <TextField label='Search Games...' variant='outlined' fullWidth onChange={onSearchUpdate} />
        {getContent()}
      </div>
    )
  }
}
