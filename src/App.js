import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Public from './Public'
import Dashboard from './Dashboard'
import Callback from './auth/Callback'
import Header from './Header'
import SessionManager from './auth/sessionManager'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = { sessionManager: undefined }
  }

  async componentDidMount () {
    const sessionManager = new SessionManager()
    await sessionManager.init()
    this.setState({ sessionManager })
  }

  render () {
    const { sessionManager } = this.state

    if (sessionManager === undefined || !sessionManager.isAuthenticated()) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path='/auth/callback' component={Callback} />
            <Route path='/' component={Public} />
          </Switch>
        </BrowserRouter>
      )
    }

    const client = sessionManager.getClient()

    return (
      <div>
        <Header sessionManager={sessionManager} />
        <BrowserRouter>
          <Switch>
            <Route path='/'>
              <Dashboard client={client} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
