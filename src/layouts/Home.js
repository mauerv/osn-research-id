import React, { Component } from 'react'
import { Link } from 'react-router'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g jumbotron">
          <div className="pure-u-1-1">
            <h1>Get Your Unique Blockchain Researcher ID</h1>
            <p>Get a unique identifier that you can use for all your research related activities.</p>
            <Link to="/signup" className="pure-button pure-button-primary">Get ID</Link>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
