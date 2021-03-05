import React from 'react'

import Moment from 'react-moment'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Progress from './Progress'
import PlatformIcon from './PlatformIcon'

const styles = {
  root: {
    margin: 10
  },
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  media: {
    margin: 5,
    maxHeight: 200,
    minWidth: 100
  }
}

function GameCard (props) {
  const { game, classes } = props
  const handleClick = () => {
    window.location = `/games/${game.uid.platform}/${game.uid.id}`
  }

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardContent>
          <div className={classes.content}>
            <img className={classes.media} src={game.displayImage} alt={game.name} />
            <PlatformIcon platform={game.uid.platform} />
            <Typography gutterBottom variant='h5' component='h2'>
              {game.name}
            </Typography>
          </div>
          {
            game.achievementsTotal > 0
              ? (<Progress value={game.achievementsCurrent} total={game.achievementsTotal} />)
              : undefined
          }
          Updated <Moment date={game.lastUpdated} fromNow />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default withStyles(styles)(GameCard)
