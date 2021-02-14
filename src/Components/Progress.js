import React from 'react'

import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  progress: {
    display: 'flex',
    flexGrow: 2
  },
  metrics: {
    marginLeft: 5
  }
}

function Progress (props) {
  const { classes, value, total } = props
  return (
    <div className={classes.root}>
      <LinearProgress className={classes.progress} variant='determinate' value={value * 100 / total} />
      <Typography className={classes.metrics}>
        {value} of {total}
      </Typography>
    </div>
  )
}

export default withStyles(styles)(Progress)
