import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'
import SyncIcon from '@material-ui/icons/Sync'
import IconButton from '@material-ui/core/IconButton'

import { APP_NAME, APP_DESCRIPTION } from '../Constants'
import Session from './UserAvatar'
import CheetosClient from '../api/cheetosClient'

const styles = {
  spinner: {
    marginRight: 20,
    minWidth: 40
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

class JobStatus extends Component {
  constructor (props) {
    super(props)
    this.state = { jobs: undefined }
    this.client = new CheetosClient()
  }

  async tick () {
    const { client } = this

    const jobs = await client.getJobCount()
    this.setState({ jobs })

    if (jobs) {
      setTimeout(() => this.tick(), 2000)
    }
  }

  async componentDidMount () {
    await this.tick()
  }

  render () {
    const { jobs } = this.state

    const handleSync = async () => {
      const { client } = this
      await client.sync()
      await this.tick()
    }

    if (!jobs) {
      return (
        <Tooltip title='Sync Games'>
          <IconButton onClick={handleSync}>
            <SyncIcon />
          </IconButton>
        </Tooltip>
      )
    }

    return (
      <Tooltip title='Sync in Progress...'>
        <Box position='relative' display='inline-flex'>
          <CircularProgress color='secondary' />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position='absolute'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Typography variant='caption' component='div' color='textSecondary'>
              {jobs}
            </Typography>
          </Box>
        </Box>
      </Tooltip>
    )
  }
}

function Header (props) {
  const { classes, session } = props

  const displayName = session.isAuthenticated() ? <DisplayName profile={session.getProfile()} /> : undefined
  const userAvatar = session.isAuthenticated() ? <Session session={session} /> : undefined
  const jobStatus = session.isAuthenticated() ? <div className={classes.spinner}><JobStatus /></div> : undefined

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
          {jobStatus}
          {displayName}
          {userAvatar}
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default withStyles(styles)(Header)
