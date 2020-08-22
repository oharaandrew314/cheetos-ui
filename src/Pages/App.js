import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Public from './Public'
import Dashboard from './Dashboard'
import Header from '../Components/Header'
import Profile from './Profile'
import SessionManager from '../auth/sessionManager'
import Game from './Game'

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

    if (!session.isAuthenticated()) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path='/auth/callback' component={Callback} />
            <Route path='/' component={Public} />
          </Switch>
        </BrowserRouter>
      )
    }

    return (
      <div>
        <Header session={session} />
        <BrowserRouter>
          <Switch>
            <Route path='/auth/callback' component={Callback} />
            <Route path='/profile'>
              <Profile profile={session.getProfile()} />
            </Route>
            <Route path='/games/:uuid' component={Game} />
            <Route path='/' exact>
              <Dashboard session={session} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
