import React from 'react'

import SessionManager from './managers/sessionManager'

const sessionManager = new SessionManager()

function handleLogout () {
  sessionManager.logout()
  window.location = '/'
}

export default function () {
  const logoutButon = sessionManager.isAuthenticated()
    ? (
      <button onClick={handleLogout}>Log Out</button>
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
