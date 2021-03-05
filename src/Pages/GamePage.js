import React, { Component } from 'react'

import CheetosClient from '../api/cheetosClient'
import AchievementList from '../Components/AchievementList'
import GameCard from '../Components/GameCard'

export default class Game extends Component {
  constructor (props) {
    super(props)
    this.state = { game: undefined }
  }

  async componentDidMount () {
    const { platform, id } = this.props.match.params

    const game = await new CheetosClient().game(platform, id)
    this.setState({ game })
  }

  render () {
    const { game } = this.state

    if (!game) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <div>
        <GameCard game={game} />

        <AchievementList game={game} />
      </div>
    )
  }
}
