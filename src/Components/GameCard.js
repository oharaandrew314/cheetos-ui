import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Progress from './Progress'

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
  },
  platform: {
    width: 40,
    margin: 10
  }
}

function logoUrl (game) {
  if (game.platform === 'Steam') {
    return '/img/steam_logo.png'
  }
  return undefined
}

function GameCard (props) {
  const { game, classes } = props

  const handleClick = () => {
    window.location = `/games/${game.platform}/${game.id}`
  }

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardContent>
          <div className={classes.content}>
            <img className={classes.media} src={game.displayImage} alt={game.name} />
            <img className={classes.platform} src={logoUrl(game)} alt='steam' />
            <Typography gutterBottom variant='h5' component='h2'>
              {game.name}
            </Typography>
          </div>
          <Progress value={13} total={34} />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default withStyles(styles)(GameCard)
