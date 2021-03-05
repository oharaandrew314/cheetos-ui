import React from 'react'

import AchievementCard from './AchievementCard'

export default function AchievementList (props) {
  const { achievements } = props

  return achievements
    .map(achievement => <AchievementCard key={achievement.id} achievement={achievement} />)
}
