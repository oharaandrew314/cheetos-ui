import React, { Component } from 'react'

export default class Header extends Component {
  constructor (props) {
    super(props)

    this.state = { profile: undefined }

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    this.props.sessionManager.logout()
    window.location = '/'
  }

  async componentDidMount () {
    const { client } = this.props

    const profile = await client.profile()
    this.setState({ profile })
  }

  render () {
    const { profile } = this.state

    const logoutButon = profile !== undefined
      ? (
        <span>
          {profile.displayName}
          <button onClick={this.handleLogout}>Log Out</button>
        </span>
      )
      : (
        <div />
      )

    return (
      <header>
        <h1>Cheetos Bros</h1>

        {logoutButon}
      </header>
    )
  }
}
