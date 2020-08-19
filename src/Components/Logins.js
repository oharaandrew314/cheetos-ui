import React from 'react'

import { STEAM_LOGIN_URL, OPENXBL_LOGIN_URL } from '../Constants'

export function LogInWithSteam () {
  return (
    <a href={STEAM_LOGIN_URL}>
      <img alt='Sign in with Steam' src='/img/steam_login_1.png' />
    </a>
  )
}

export function LogInWithXbox () {
  return (
    <a href={OPENXBL_LOGIN_URL}>
      <img alt='Sign in with Microsoft' src='/img/xbox_login_light.svg' />
    </a>
  )
}
