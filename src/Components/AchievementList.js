import React, { Component } from 'react'

import { cheetosClient } from '../api/cheetosClient'

export default class AchievementList extends Component {
  constructor (props) {
    super(props)
    this.state = { achievements: undefined, statuses: undefined }
  }

  async componentDidMount () {
    const { game } = this.props
    const achievements = await cheetosClient.achievements(game.platform, game.id)
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

    return (
      <div>
        <ul>
          {achievements.map(achievement => {
            return (
              <li key={achievement.id}>
                {achievement.name}:
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
