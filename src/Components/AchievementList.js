import React, { Component } from 'react'
import FadeIn from 'react-fade-in'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

import Select from '@material-ui/core/Select'

import AchievementCard from './AchievementCard'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    display: 'flex'
  },
  show: {
    margin: 5,
    minWidth: 120,
    flexGrow: 1
  },
  divider: {
    flexGrow: 1
  },
  order: {
    minWidth: 240
  }
}

class AchievementList extends Component {
  constructor (props) {
    super(props)
    this.state = { show: 'all', sortBy: 'unlocked', order: 'desc' }
  }

  handleChangeShow (evt) {
    const show = evt.target.value

    this.setState(({ show }))
  }

  handleChangeSort (evt) {
    const sortBy = evt.target.value

    this.setState({ sortBy })
  }

  handleChangeOrder (evt) {
    const order = evt.target.value

    this.setState({ order })
  }

  render () {
    const { achievements, classes } = this.props
    const { show, sortBy, order } = this.state

    const shouldShow = (achievement) => {
      if (show === 'unlocked') {
        return achievement.unlocked
      } else if (show === 'locked') {
        return !achievement.unlocked
      } else if (show === 'hidden') {
        return achievement.hidden
      }
      return true
    }

    const compare = (a, b) => {
      const modifier = order === 'asc' ? 1 : -1
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name) * modifier
      }

      if (!a.unlockedOn) {
        return modifier
      }
      if (!b.unlockedOn) {
        return -modifier
      }

      return a.unlockedOn.localeCompare(b.unlockedOn) * modifier
    }

    const elements = achievements
      .filter(shouldShow)
      .sort(compare)
      .map(achievement => {
        return (
          <FadeIn key={achievement.id}>
            <AchievementCard achievement={achievement} />
          </FadeIn>
        )
      })

    return (
      <div>
        <div className={classes.root}>
          <FormControl className={classes.show}>
            <InputLabel id='show'>Show</InputLabel>
            <Select labelid='show' value={show} onChange={this.handleChangeShow.bind(this)}>
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='unlocked'>Unlocked</MenuItem>
              <MenuItem value='locked'>Locked</MenuItem>
              <MenuItem value='hidden'>Hidden</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.divider} />

          <FormControl className={classes.order}>
            <InputLabel id='sort-by'>Sort By</InputLabel>
            <Select labelid='sort-by' onChange={this.handleChangeSort.bind(this)} value={sortBy}>
              <MenuItem value='unlocked'>Unlocked</MenuItem>
              <MenuItem value='name'>Name</MenuItem>
            </Select>
            <Select value={order} onChange={this.handleChangeOrder.bind(this)}>
              <MenuItem value='asc'>Ascending</MenuItem>
              <MenuItem value='desc'>Descending</MenuItem>
            </Select>
          </FormControl>
        </div>

        {elements}
      </div>
    )
  }
}

export default withStyles(styles)(AchievementList)
