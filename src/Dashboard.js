import React, { Component } from 'react'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.client = props.client

    this.state = { games: [], profile: undefined }
  }

  async componentDidMount () {
    const profile = await this.client.profile()
    this.setState({ profile })
  }

  render () {
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    )
  }
}
