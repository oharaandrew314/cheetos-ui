import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { STEAM_LOGIN_URL, OPENXBL_LOGIN_URL } from '../Constants'
import Public from './Public'
import Dashboard from './Dashboard'
import Callback from '../auth/Callback'
import Header from '../Components/Header'
import SessionManager from '../auth/sessionManager'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = { session: undefined }
  }

  async componentDidMount () {
    const session = new SessionManager()
    await session.init()
    this.setState({ session })
  }

  render () {
    const { session } = this.state

    if (session === undefined || !session.isAuthenticated()) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path='/auth/callback' component={Callback} />
            <Route path='/'>
              <Public steamLoginUrl={STEAM_LOGIN_URL} openxblLoginUrl={OPENXBL_LOGIN_URL} />
            </Route>
          </Switch>
        </BrowserRouter>
      )
    }

    return (
      <div>
        <Header session={session} />
        <BrowserRouter>
          <Switch>
            <Route path='/'>
              <Dashboard session={session} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
