import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Public from './Public'
import Dashboard from './Dashboard'
import Callback from './auth/Callback'
import Header from './Header'

import SessionManager from './managers/sessionManager'

const sessionManager = new SessionManager()

export default function App () {
  if (!sessionManager.isAuthenticated()) {
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
      <Header sessionManager={sessionManager} client={client} />
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
