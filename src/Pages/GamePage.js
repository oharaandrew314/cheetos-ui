import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import CheetosClient from '../api/cheetosClient'
import AchievementList from '../Components/AchievementList'
import PlatformIcon from '../Components/PlatformIcon'
import Progress from '../Components/Progress'

const styles = {
  avatar: {
    marginLeft: 10
  },
  title: {
    flexGrow: 1
  },
  root: {
    marginBottom: 20
  },
  toolbar: {
    display: 'flex'
  },
  element: {
    flexGrow: 1,
    marginLeft: 10
  },
  media: {
    margin: 5,
    maxHeight: 200,
    minWidth: 100,
    maxWidth: 300
  }
}

function Header (props) {
  const { classes, platform, game } = props

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <IconButton to='/' component={Link}>
          <ArrowBackIcon />
        </IconButton>
        {
          game
            ? <img className={classes.media} src={game.displayImage} alt={game.name} />
            : undefined
        }
        <PlatformIcon platform={platform} />
        {
          game
            ? <Typography variant='h5'>{game.name}</Typography>
            : <CircularProgress color='secondary' />
        }
        {
          game
            ? (
              <div className={classes.element}>
                <Progress value={game.achievementsCurrent} total={game.achievementsTotal} secondary />
              </div>
              )
            : undefined
        }
      </Toolbar>
    </AppBar>
  )
}

class GamePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: undefined,
      achievements: undefined
    }
  }

  async componentDidMount () {
    const { platform, id } = this.props.match.params

    const client = new CheetosClient()
    const gamePromise = client.game(platform, id)
    const achievementsPromise = client.achievements(platform, id)

    const game = await gamePromise
    const achievements = await achievementsPromise

    this.setState({ game, achievements })
  }

  render () {
    const { platform } = this.props.match.params
    const { classes } = this.props
    const { game, achievements } = this.state

    const content = game
      ? <AchievementList achievements={achievements} />
      : <CircularProgress size={200} />

    return (
      <div>
        <Header classes={classes} platform={platform} game={game} />
        {content}
      </div>
    )
  }
}

export default withStyles(styles)(GamePage)
