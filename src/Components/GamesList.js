import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

import CheetosClient from '../api/cheetosClient'
import GameCard from './GameCard'

const styles = {
  search: {
    marginBottom: 20
  }
}

class GamesList extends Component {
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
    const games = await new CheetosClient().games()
    this.setState({ games, displayed: games })
  }

  render () {
    const { classes } = this.props
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

      return displayed.map(game => <GameCard key={`${game.uid}`} game={game} />)
    }

    return (
      <div>
        <TextField className={classes.search} label='Search Games...' variant='outlined' fullWidth onChange={onSearchUpdate} />
        {getContent()}
      </div>
    )
  }
}

export default withStyles(styles)(GamesList)