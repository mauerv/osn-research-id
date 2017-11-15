import React, { Component } from 'react'
import Button from './Button'

class PendingListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id
    }
  }

  handleApprove(event) {
    event.preventDefault()

    this.props.onApproveClick(this.state.id)
  }

  handleReject(event) {
    event.preventDefault()

    this.props.onRejectClick(this.state.id)
  }

  render() {
    return (
      <li>
        <p>{this.props.id}</p>
          <Button text='Approve' onButtonClick={this.handleApprove.bind(this)}/>
          <Button text='Reject' onButtonClick={this.handleReject.bind(this)} />
      </li>
    )
  }
}

export default PendingListItem
