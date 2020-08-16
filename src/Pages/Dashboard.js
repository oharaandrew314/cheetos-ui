import React, { Component } from 'react'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = { games: [] }
  }

  async componentDidMount () {
    const client = this.props.session.client

    const games = await client.games()
    this.setState({ games })
  }

  render () {
    const { games } = this.state

    return (
      <div>
        <h2>Dashboard</h2>

        <h3>Games</h3>
        <ul>
          {games.map(game => {
            return <li key={game.id}>({game.platform}) {game.name}</li>
          })}
        </ul>
      </div>
    )
  }
}
