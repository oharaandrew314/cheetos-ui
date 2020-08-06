import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Public from './Public'
import Dashboard from './Dashboard'
import Callback from './auth/Callback'
import Header from './Header'

import SessionManager from './managers/sessionManager'

const sessionManager = new SessionManager()

export default function App () {
  const routes = sessionManager.isAuthenticated()
    ? (
      <div>
        <Route path='/' component={Dashboard} />
      </div>
    )
    : (
      <div>
        <Route path='/' component={Public} />
      </div>
    )

  return (
    <div>
      <Header />

      <BrowserRouter>
        <Switch>
          <Route path='/auth/callback' component={Callback} />
          {routes}
        </Switch>
      </BrowserRouter>
    </div>
  )
}
