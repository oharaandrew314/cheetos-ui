import React from 'react'

export default function ({ steamLoginUrl, openxblLoginUrl }) {
  return (
    <div>
      <a href={steamLoginUrl}>
        <img alt='Sign in with Steam' src='/img/steam_login_1.png' />
      </a>
      <a href={openxblLoginUrl}>
        <img alt='Sign in with Microsoft' src='/img/xbox_login_light.svg' />
      </a>
    </div>
  )
}
