import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Public from './Public'
import Dashboard from './Dashboard'
import Header from '../Components/Header'
import Profile from './Profile'
import SessionManager from '../auth/sessionManager'
import GamePage from './GamePage'

function Callback () {
  window.location = '/'
}

export default class App extends Component {
  constructor (props) {
    super(props)
    this.session = new SessionManager()
  }

  render () {
    const { session } = this
    const paths = session.isAuthenticated()
      ? (
        <Switch>
          <Route path='/auth/callback' exact component={Callback} />
          <Route path='/profile' exact>
            <Profile profile={session.getProfile()} />
          </Route>
          <Route path='/games/:platform/:id' exact component={GamePage} />
          <Route path='/' exact>
            <Dashboard />
          </Route>
        </Switch>
        )
      : (
        <Switch>
          <Route path='/auth/callback' component={Callback} />
          <Route path='/' component={Public} />
        </Switch>
        )
    return (
      <div>
        <BrowserRouter>
          <Header session={session} />
          {paths}
        </BrowserRouter>
      </div>
    )
  }
}
