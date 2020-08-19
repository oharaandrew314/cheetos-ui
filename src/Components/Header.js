import React, { Component } from 'react'

export default class Header extends Component {
  constructor (props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    this.props.session.logout()
    window.location = '/'
  }

  render () {
    const profile = this.props.session.getProfile()

    return (
      <header>
        <a href='/'>
          <h1>Cheetos Bros</h1>
        </a>

        <span>
          <a href='/profile'>
            {profile.displayName}
          </a>
          <button onClick={this.handleLogout}>Log Out</button>
        </span>
      </header>
    )
  }
}
