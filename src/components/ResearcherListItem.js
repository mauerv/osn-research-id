import React, { Component } from 'react'
import Button from './Button'

class ResearcherListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.onButtonClick(this.state.id)
  }
  render() {
    return (
      <li>
        <p>{this.props.id}</p>
        <Button text='Remove' onButtonClick={this.handleSubmit.bind(this)}/>
      </li>
    )
  }
}

export default ResearcherListItem
