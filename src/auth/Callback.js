
import SessionManager from './sessionManager'

const sessionManager = new SessionManager()

export default async function (props) {
  const params = new URLSearchParams(props.location.search)
  const token = params.get('token')

  await sessionManager.login(token)

  window.location = '/'
}
