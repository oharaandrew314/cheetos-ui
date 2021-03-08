import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { APP_NAME, APP_DESCRIPTION } from '../Constants'
import Session from './UserAvatar'

const styles = {
  avatar: {
    marginLeft: 10
  },
  description: {
    flexGrow: 1,
    marginLeft: 20
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
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h3' color='inherit'>
            {APP_NAME}
          </Typography>
          <Typography variant='h5' className={classes.description} color='inherit'>
            {APP_DESCRIPTION}
          </Typography>
          {displayName}
          {userAvatar}
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default withStyles(styles)(Header)