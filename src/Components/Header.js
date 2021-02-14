import React from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'

import { APP_NAME } from '../Constants'

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 100
  },
  title: {
    flexGrow: 1
  }
}

function Header (props) {
  const { classes, session } = props
  const profile = session.getProfile()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    session.logout()
    window.location = '/'
  }

  const handleCloseSessionDropdown = () => {
    setAnchorEl(null)
  }

  return (
    <header>
      <AppBar position='static' className={classes.toolbar}>
        <Toolbar>
          <Typography variant='h3' className={classes.title} color='inherit' to='/' component={Link}>
            {APP_NAME}
          </Typography>

          <Typography variant='h5' color='inherit' to='/profile' component={Link}>
            {profile.displayName}
          </Typography>

          <Avatar alt={profile.displayName} src={profile.avatar} onClick={handleClickAvatar} />
          <Menu
            id='session-dropdown'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseSessionDropdown}
          >
            <MenuItem>{profile.displayName}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default withStyles(styles)(Header)