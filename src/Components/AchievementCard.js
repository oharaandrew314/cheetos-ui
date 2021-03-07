import React from 'react'

import Moment from 'react-moment'

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import Tooltip from '@material-ui/core/Tooltip'
import { green, grey } from '@material-ui/core/colors'
import Paper from '@material-ui/core/Paper'

import AchievementIcon from './AchievementIcon'

const styles = {
  root: {
    margin: 5,
    padding: 5,
    maxWidth: 1024
  },
  completed: {
    color: green[500],
    fontSize: 40,
    flexGrow: 6
  },
  notCompleted: {
    color: grey[500],
    fontSize: 40
  },
  hidden: {
    fontSize: 40,
    color: grey[500]
  },
  topRow: {
    display: 'flex'
  },
  left: {
    flexGrow: 1
  }
}

function Status (props) {
  const { achievement, classes } = props

  return (
    <div>
      {
        achievement.hidden
          ? (
            <Tooltip title='Hidden'>
              <VisibilityOffIcon className={classes.hidden} />
            </Tooltip>
            )
          : undefined
      }
      <Tooltip title={achievement.unlocked ? <Moment date={achievement.unlockedOn} /> : 'Not Unlocked'}>
        <CheckCircleOutlineIcon className={achievement.unlocked ? classes.completed : classes.notCompleted} />
      </Tooltip>
    </div>
  )
}

function AchievementCard (props) {
  const { achievement, classes } = props

  return (
    <Paper className={classes.root}>
      <div className={classes.topRow}>
        <AchievementIcon className={classes.left} achievement={achievement} />
        <Typography className={classes.left} gutterBottom variant='h5' component='h2'>
          {achievement.name}
        </Typography>
        <Status achievement={achievement} classes={classes} />
      </div>
      {
        achievement.description
          ? <Typography> {achievement.description}</Typography>
          : undefined
      }
    </Paper>
  )
}

export default withStyles(styles)(AchievementCard)
