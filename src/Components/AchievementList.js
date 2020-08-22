import React, { Component } from 'react'

import { cheetosClient } from '../api/cheetosClient'

export default class AchievementList extends Component {
  constructor (props) {
    super(props)
    this.state = { achievements: undefined }
  }

  async componentDidMount () {
    const { game } = this.props
    const achievements = await cheetosClient.achievements(game.uuid)
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
          {achievements.map(data => {
            const { achievement, status } = data

            return (
              <li key={achievement.id}>
                {achievement.name}: {status.unlockedOn ? 'DONE!' : ''}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
