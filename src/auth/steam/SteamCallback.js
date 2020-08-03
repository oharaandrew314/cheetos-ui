
import SessionManager from '../../managers/sessionManager'

const sessionManager = new SessionManager()

export default function (props) {
  const token = new URLSearchParams(props.location.search).get('token')
  sessionManager.setToken(token)

  window.location = '/'
}
