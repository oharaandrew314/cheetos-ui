import React, { Component } from 'react'

import CheetosClient from '../api/cheetosClient'
import AchievementCard from './AchievementCard'

export default class AchievementList extends Component {
  constructor (props) {
    super(props)
    this.state = { achievements: undefined }
  }

  async componentDidMount () {
    const { game } = this.props
    const client = new CheetosClient()

    const achievements = await client.achievements(game.platform, game.id)
    console.log(achievements)
    this.setState({ achievements })
  }

  render () {
    const { achievements } = this.state

    if (achievements === undefined) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    if (achievements.length === 0) {
      return (
        <div>
          There are no achievements for this game :(
        </div>
      )
    }

    return achievements.map(achievement => <AchievementCard key={achievement.id} achievement={achievement} />)
  }
}
