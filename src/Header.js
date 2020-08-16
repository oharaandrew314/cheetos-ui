import React, { Component } from 'react'

export default class Header extends Component {
  constructor (props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    this.props.sessionManager.logout()
    window.location = '/'
  }

  render () {
    const profile = this.props.sessionManager.getProfile()

    return (
      <header>
        <h1>Cheetos Bros</h1>

        <span>
          {profile.displayName}
          <button onClick={this.handleLogout}>Log Out</button>
        </span>
      </header>
    )
  }
}
