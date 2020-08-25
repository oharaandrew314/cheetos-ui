import React, { Component } from 'react'

import { cheetosClient } from '../api/cheetosClient'
import AchievementList from '../Components/AchievementList'

export default class Game extends Component {
  constructor (props) {
    super(props)
    this.state = { game: undefined, player: undefined }
  }

  async componentDidMount () {
    const { platform, id } = this.props.match.params

    const game = await cheetosClient.game(platform, id)
    this.setState({ game })

    const player = await cheetosClient.getMyPlayer(platform)
    this.setState({ player })
  }

  render () {
    const { game, player } = this.state

    if (!game || !player) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <div>
        <h2>({game.platform}) {game.name}</h2>

        <AchievementList game={game} player={player} />
      </div>
    )
  }
}
