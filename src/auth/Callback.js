
import SessionManager from '../managers/sessionManager'

const sessionManager = new SessionManager()

export default function (props) {
  const params = new URLSearchParams(props.location.search)
  const token = params.get('token')
  const displayName = params.get('displayName')

  sessionManager.setToken(token, displayName)

  window.location = '/'
}
