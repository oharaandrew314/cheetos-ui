import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'

import { ReactComponent as SteamIcon } from '../assets/steam_logo.svg'

const styles = {
  root: {
    fontSize: 40,
    margin: 10
  }
}

function PlatformIcon (props) {
  const { platform, classes } = props
  if (platform === 'Steam') {
    return (
      <SvgIcon className={classes.root}>
        <SteamIcon />
      </SvgIcon>
    )
  }
  return undefined
}

export default withStyles(styles)(PlatformIcon)
