import React from 'react'
import FadeIn from 'react-fade-in'

import AchievementCard from './AchievementCard'

export default function AchievementList (props) {
  const { achievements } = props

  return achievements
    .map(achievement => {
      return (
        <FadeIn key={achievement.id}>
          <AchievementCard achievement={achievement} />
        </FadeIn>
      )
    })
}
