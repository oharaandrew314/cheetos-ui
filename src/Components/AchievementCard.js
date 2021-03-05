import React from 'react'

import Moment from 'react-moment'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import Tooltip from '@material-ui/core/Tooltip'

import AchievementIcon from './AchievementIcon'

const styles = {
  root: {
    margin: 5,
    maxWidth: 1024,
    display: 'flex',
    flexWrap: 'wrap'
  },
  content: {
    display: 'flex',
    alignItems: 'center'
  }
}

function AchievementCard (props) {
  const { achievement, classes } = props

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.content}>
          <AchievementIcon achievement={achievement} />
          <Typography gutterBottom variant='h5' component='h2'>
            {achievement.name}
          </Typography>
          <Typography gutterBottom>
            {achievement.description}
          </Typography>
          {
            achievement.unlocked
              ? <Moment date={achievement.unlockedOn} format='YYYY-MM-DD' />
              : undefined
          }
          {
            achievement.hidden
              ? (
                <Tooltip title='Hidden'>
                  <VisibilityOffIcon />
                </Tooltip>
                )
              : undefined
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(AchievementCard)
