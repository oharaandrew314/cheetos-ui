import React from 'react'

import { LogInWithXbox, LogInWithSteam } from '../Components/Logins'

export default function () {
  return (
    <div>
      <LogInWithSteam />
      <LogInWithXbox />
    </div>
  )
}
