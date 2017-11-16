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
      <li className='list-item'>
          <p>{this.props.id}</p>
          <div className='list-item-buttons'>
            <Button text='Approve' onButtonClick={this.handleApprove.bind(this)}/>
            <Button text='Reject' onButtonClick={this.handleReject.bind(this)} />
          </div>
      </li>
    )
  }
}

export default PendingListItem
