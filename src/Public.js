import React from 'react'
import { STEAM_LOGIN_URL } from './Constants'

export default function () {
  return (
    <div>
      <a href={STEAM_LOGIN_URL}>
        <img src='/img/steam_login_1.png' />
      </a>
    </div>
  )
}
