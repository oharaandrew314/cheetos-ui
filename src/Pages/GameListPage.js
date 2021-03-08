import React from 'react'

import GamesList from '../Components/GamesList'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    marginTop: 20
  }
}

function GameListPage (props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <GamesList />
    </div>
  )
}

export default withStyles(styles)(GameListPage)
