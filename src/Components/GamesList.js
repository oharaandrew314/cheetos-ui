import React, { Component } from 'react'
import FadeIn from 'react-fade-in'
import InfiniteScroll from 'react-infinite-scroller'

import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

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
      filtered: undefined
    }
  }

  async componentDidMount () {
    const games = await new CheetosClient().games()
    this.setState({ games, filtered: games })
  }

  render () {
    const { classes } = this.props
    const { filtered } = this.state

    const onSearchUpdate = (event) => {
      const { games } = this.state
      const value = event.target.value

      const filtered = games
        .filter(game => game.name.toLowerCase().includes(value.toLowerCase()))

      this.setState({ filtered, numToDisplay: 20 })
    }

    const getContent = () => {
      if (filtered === undefined) {
        return <CircularProgress size={200} />
      }
      if (filtered.length === 0) {
        return <div>No games found</div>
      }

      return <LoadingGameList games={filtered} />
    }

    return (
      <div>
        <TextField className={classes.search} label='Search Games...' variant='outlined' fullWidth onChange={onSearchUpdate} />
        {getContent()}
      </div>
    )
  }
}

class LoadingGameList extends Component {
  constructor (props) {
    super(props)
    this.state = { numLoaded: 20 }
  }

  render () {
    const { games } = this.props
    const { numLoaded } = this.state

    const loadMore = () => {
      this.setState((prevState) => ({
        numLoaded: prevState.numLoaded + 20
      }))
    }

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={numLoaded < games.length}
        loader={<CircularProgress />}
      >
        {
          games
            .slice(0, numLoaded)
            .map(game => (
              <FadeIn key={game.uid}>
                <GameCard game={game} />
              </FadeIn>
            ))
        }
      </InfiniteScroll>
    )
  }
}

export default withStyles(styles)(GamesList)
