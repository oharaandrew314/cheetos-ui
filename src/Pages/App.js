import React from 'react'
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom'

import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline, createMuiTheme } from '@material-ui/core'

import Public from './Public'
import GameListPage from './GameListPage'
import Header from '../Components/Header'
import SessionManager from '../auth/sessionManager'
import GamePage from './GamePage'

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

export default function App () {
  const session = new SessionManager()

  function Callback () {
    const { search } = useLocation()
    const params = new URLSearchParams(search)

    const token = params.get('session')
    session.login(token)

    window.location = '/'
  }

  const paths = session.isAuthenticated()
    ? (
      <Switch>
        <Route path='/auth/callback' exact component={Callback} />
        <Route path='/games/:platform/:id' exact component={GamePage} />
        <Route path='/' exact>
          <GameListPage />
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header session={session} />
        {paths}
      </BrowserRouter>
    </ThemeProvider>
  )
}
