import React, { Component } from 'react'

import { cheetosClient } from '../api/cheetosClient'
import AchievementList from '../Components/AchievementList'

export default class Game extends Component {
  constructor (props) {
    super(props)
    this.state = { game: undefined }
  }

  async componentDidMount () {
    const { platform, id } = this.props.match.params

    const game = await cheetosClient.game(platform, id)
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
        <h2>({game.platform}) {game.name}</h2>

        <AchievementList game={game} />
      </div>
    )
  }
}
