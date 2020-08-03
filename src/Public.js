import React from 'react'
import { STEAM_LOGIN_URL } from './Constants'

export default function () {
  return (
    <div>
      <a href={STEAM_LOGIN_URL}>
        <button>
            Login with Steam
        </button>
      </a>
    </div>
  )
}
