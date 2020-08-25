import React, { Component } from 'react'

import { cheetosClient } from '../api/cheetosClient'

export default class AchievementList extends Component {
  constructor (props) {
    super(props)
    this.state = { achievementDetails: undefined }
  }

  async componentDidMount () {
    const { game, player } = this.props

    const achievements = await cheetosClient.achievements(game.platform, game.id)
    console.log(achievements)
    if (achievements.length === 0) {
      this.setState({ achievementDetails: [] })
      return
    }

    const statuses = await cheetosClient.achievementStatuses(game.platform, game.id, player.id)
    console.log(statuses)

    const statusesByAchievementId = statuses.reduce((map, status) => {
      map[status.achivementId] = status
      return map
    })

    const achievementDetails = achievements.map(achievement => {
      const status = statusesByAchievementId[achievement.id]
      return { achievement, status }
    })
    console.log(achievementDetails)

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
