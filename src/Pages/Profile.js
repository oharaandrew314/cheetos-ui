import React from 'react'

import { LogInWithSteam } from '../Components/Logins'

export default function ({ profile }) {
  return (
    <div>
      <h2>Profile</h2>

      <h3>Id</h3>
      {profile.sub}

      <h3>Steam</h3>
      {profile.steamUsername
        ? profile.steamUsername
        : <LogInWithSteam />}
    </div>
  )
}
