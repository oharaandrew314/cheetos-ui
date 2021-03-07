import React from 'react'

import Moment from 'react-moment'

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import Tooltip from '@material-ui/core/Tooltip'
import { green, grey } from '@material-ui/core/colors'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

import AchievementIcon from './AchievementIcon'

const styles = {
  root: {
    margin: 5,
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
    <Accordion className={classes.root}>
      <AccordionSummary className={classes.root}>
        <AchievementIcon className={classes.left} achievement={achievement} />
        <Typography className={classes.left} gutterBottom variant='h5' component='h2'>
          {achievement.name}
        </Typography>
        <Status achievement={achievement} classes={classes} />
      </AccordionSummary>

      <AccordionDetails>
        <Typography>
          {achievement.description || 'No description...'}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default withStyles(styles)(AchievementCard)
