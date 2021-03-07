import React from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { APP_NAME } from '../Constants'
import Session from './UserAvatar'

const styles = {
  avatar: {
    marginLeft: 10
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    marginBottom: 20
  }
}

function DisplayName (props) {
  const { profile } = props
  return (
    <Typography variant='h5' color='inherit'>
      {profile.displayName}
    </Typography>
  )
}

function Header (props) {
  const { classes, session } = props

  const displayName = session.isAuthenticated() ? <DisplayName profile={session.getProfile()} /> : undefined
  const userAvatar = session.isAuthenticated() ? <Session session={session} /> : undefined

  return (
    <header>
      <AppBar position='static' className={classes.toolbar}>
        <Toolbar>
          <Typography variant='h3' className={classes.title} color='inherit' to='/' component={Link}>
            {APP_NAME}
          </Typography>
          {displayName}
          {userAvatar}
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default withStyles(styles)(Header)