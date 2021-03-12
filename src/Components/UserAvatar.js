import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  avatar: {
    marginLeft: 10
  }
}

function UserAvatar (props) {
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
    <span>
      <Button>
        <Avatar
          className={classes.avatar}
          alt={profile.displayName}
          src={profile.avatar}
          onClick={handleClickAvatar}
        />
      </Button>
      <Menu
        id='session-dropdown'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseSessionDropdown}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </span>
  )
}

export default withStyles(styles)(UserAvatar)