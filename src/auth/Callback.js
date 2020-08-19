
import SessionManager from './sessionManager'
import CheetosClient from '../api/cheetosClient'

const sessionManager = new SessionManager()
const client = new CheetosClient()

export default async function (props) {
  const profile = await client.profile()
  console.log(`logged in as ${profile}`)
  if (profile) {
    sessionManager.login(profile)
  }

  window.location = '/'
}
