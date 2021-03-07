import React from 'react'

import Moment from 'react-moment'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import StarIcon from '@material-ui/icons/Star'
import { yellow } from '@material-ui/core/colors'

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
    minWidth: 100,
    maxWidth: 300,
    flexGrow: 1
  },
  completeIcon: {
    fontSize: 40,
    color: yellow[500]
  },
  platform: {
    flexGrow: 1
  },
  name: {
    flexGrow: 1
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
            <PlatformIcon className={classes.platform} platform={game.uid.platform} />
            <Typography gutterBottom variant='h5' component='h2' className={classes.name}>
              {game.name}
            </Typography>
            {
              game.completion() === 1
                ? <StarIcon className={classes.completeIcon} />
                : undefined
            }
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
