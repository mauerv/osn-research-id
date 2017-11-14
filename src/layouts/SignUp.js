import React, { Component } from 'react'
import SignUpFormContainer from '../containers/SignUpFormContainer'

class SignUp extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>ID Form</h1>
            <p>We have got your wallet information, simply input your name and your request will be sent for approval.</p>
            <SignUpFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default SignUp
