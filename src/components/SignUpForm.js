import React, { Component } from 'react'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: ''
    }
  }

  onNameChange(event) {
    this.setState({ name: event.target.value })
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2 || this.state.email.length < 2)
    {
      return alert('Please fill in all required data.')
    }

    this.props.onSignUpFormSubmit(this.state.name, this.state.email)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Your Name</label>
          <input id="name" type="text" value={this.state.name} onChange={this.onNameChange.bind(this)} placeholder="Name" />
          <label htmlFor="email">Your Email</label>
          <input id="email" type="text" value={this.state.email} onChange={this.onEmailChange.bind(this)} placeholder="Email" />
          <span className="pure-form-message">All fields are required.</span>
          <br />

          <button type="submit" className="pure-button pure-button-primary">Get ID</button>
        </fieldset>
      </form>
    )
  }
}

export default SignUpForm
