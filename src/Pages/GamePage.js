import React, { Component } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'

import CheetosClient from '../api/cheetosClient'
import AchievementList from '../Components/AchievementList'
import GameCard from '../Components/GameCard'

export default class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: undefined,
      achievements: undefined
    }
  }

  async componentDidMount () {
    const { platform, id } = this.props.match.params

    const client = new CheetosClient()
    const gamePromise = client.game(platform, id)
    const achievementsPromise = client.achievements(platform, id)

    const game = await gamePromise
    const achievements = await achievementsPromise

    this.setState({ game, achievements })
  }

  render () {
    const { game, achievements } = this.state

    if (!game) {
      return <CircularProgress size={200} />
    }

    return (
      <div>
        <GameCard game={game} />

        <AchievementList achievements={achievements} />
      </div>
    )
  }
}
