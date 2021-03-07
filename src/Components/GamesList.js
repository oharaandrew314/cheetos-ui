import React, { Component } from 'react'
import FadeIn from 'react-fade-in'
import InfiniteScroll from 'react-infinite-scroller'

import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import CheetosClient from '../api/cheetosClient'
import GameCard from './GameCard'

const styles = {
  search: {
    marginBottom: 20
  },
  show: {
    margin: 5,
    minWidth: 120,
    flexGrow: 1
  },
  divider: {
    flexGrow: 1
  },
  order: {
    minWidth: 240
  }
}

class GamesList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      games: undefined,
      search: '',
      show: 'withAchievements',
      sortBy: 'completion',
      order: 'desc'
    }
  }

  async componentDidMount () {
    const games = await new CheetosClient().games()
    this.setState({ games, search: '' })
  }

  render () {
    const { classes } = this.props
    const { games, search, show, sortBy, order } = this.state

    const handleSearchUpdate = (event) => {
      const search = event.target.value

      this.setState({ search })
    }

    const filter = (game) => {
      if (!game.name.toLowerCase().includes(search.toLowerCase())) return false

      if (show === 'withAchievements') return game.achievementsTotal > 0
      if (show === 'withoutAchievements') return game.achievementsTotal === 0

      return true
    }

    const compare = (a, b) => {
      const modifier = order === 'asc' ? 1 : -1

      if (sortBy === 'completion') {
        const completionA = a.completion()
        if (completionA === undefined) return -modifier

        const completionB = b.completion()
        if (completionB === undefined) return modifier

        return (completionA - completionB) * modifier
      }

      return a.name.localeCompare(b.name) * modifier
    }

    const handleChangeShow = (evt) => {
      const show = evt.target.value

      this.setState({ show })
    }

    const handleChangeSort = (evt) => {
      const sortBy = evt.target.value

      this.setState({ sortBy })
    }

    const handleChangeOrder = (evt) => {
      const order = evt.target.value

      this.setState({ order })
    }

    const getContent = () => {
      if (games === undefined) {
        return <CircularProgress size={200} />
      }

      const filtered = games
        .filter(filter)
        .sort(compare)

      if (filtered.length === 0) {
        return <div>No games found</div>
      }

      return <LoadingGameList games={filtered} />
    }

    return (
      <div>
        <TextField className={classes.search} label='Search Games...' variant='outlined' fullWidth onChange={handleSearchUpdate} />
        <FormControl className={classes.show}>
          <InputLabel id='show'>Show</InputLabel>
          <Select labelid='show' value={show} onChange={handleChangeShow}>
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='withAchievements'>With Achievements</MenuItem>
            <MenuItem value='withoutAchievements'>Without Achievements</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.order}>
          <InputLabel id='sort-by'>Sort By</InputLabel>
          <Select labelid='sort-by' onChange={handleChangeSort} value={sortBy}>
            <MenuItem value='completion'>Completion</MenuItem>
            <MenuItem value='name'>Name</MenuItem>
          </Select>
          <Select value={order} onChange={handleChangeOrder}>
            <MenuItem value='asc'>Ascending</MenuItem>
            <MenuItem value='desc'>Descending</MenuItem>
          </Select>
        </FormControl>
        {getContent()}
      </div>
    )
  }
}

class LoadingGameList extends Component {
  constructor (props) {
    super(props)
    this.state = { numLoaded: 0 }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.games.length !== this.props.games.length) {
      this.setState({ numLoaded: 0 })
    }
  }

  render () {
    const { games } = this.props
    const { numLoaded } = this.state

    const loadMore = () => {
      this.setState((prevState) => ({
        numLoaded: prevState.numLoaded + 20
      }))
    }

    const items = games
      .slice(0, numLoaded)
      .map(game => (
        <FadeIn key={game.uid}>
          <GameCard game={game} />
        </FadeIn>
      ))

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={numLoaded < games.length}
      >
        {items}
      </InfiniteScroll>
    )
  }
}

export default withStyles(styles)(GamesList)
