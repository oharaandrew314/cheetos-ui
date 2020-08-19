import React from 'react'

import { LogInWithXbox, LogInWithSteam } from '../Components/Logins'

export default function ({ profile }) {
  console.log(profile)
  return (
    <div>
      <h2>Profile</h2>

      <h3>Id</h3>
      {profile.id}

      <h3>Xbox</h3>
      {profile.xboxGamerTag
        ? profile.xboxGamerTag
        : <LogInWithXbox />}

      <h3>Steam</h3>
      {profile.steamUsername
        ? profile.steamUsername
        : <LogInWithSteam />}
    </div>
  )
}
