import React, { Component } from 'react'

import { cheetosClient } from '../api/cheetosClient'

export default class AchievementList extends Component {
  constructor (props) {
    super(props)
    this.state = { achievementDetails: undefined }
  }

  async componentDidMount () {
    const { game } = this.props

    const achievementsFuture = cheetosClient.achievements(game.platform, game.id)
    const statusesFuture = cheetosClient.achievementStatuses(game.platform, game.id)

    const achievements = await achievementsFuture
    const statuses = await statusesFuture

    if (achievements.length === 0) {
      this.setState({ achievementDetails: [] })
      return
    }

    const statusesByAchievementId = new Map(statuses.map(i => [i.achievementId, i]))

    const achievementDetails = achievements.map(achievement => {
      const status = statusesByAchievementId.get(achievement.id)
      return { achievement, status }
    })

    this.setState({ achievementDetails })
  }

  render () {
    const { achievementDetails } = this.state

    if (achievementDetails === undefined) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    if (achievementDetails.length === 0) {
      return (
        <div>
          There are no achievements for this game :(
        </div>
      )
    }

    return (
      <div>
        <ul>
          {achievementDetails.map(details => {
            const { achievement, status } = details
            return (
              <li key={achievement.id}>
                {achievement.name} {status && status.unlockedOn ? 'DONE!' : ''}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
