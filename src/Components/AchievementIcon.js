import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    margin: 2,
    maxHeight: 50,
    minWidth: 25
  }
}

function AchievementIcon (props) {
  const { classes, achievement } = props

  let url = achievement.icons[1]
  if (achievement.unlocked) {
    url = achievement.icons[0]
  }

  return <img className={classes.root} src={url} alt={achievement.name}/>
}

export default withStyles(styles)(AchievementIcon)
