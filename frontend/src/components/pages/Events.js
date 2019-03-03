import React, { Component } from 'react'
import {ButtonContainer} from '../layout/Button';
import Modal from '../layout/modal/Modal'
import Backdrop from '../layout/modal/Backdrop'

class Events extends Component {
  state = {
    creating: false
  }

  createEventHandler = () => {
    this.setState({
      creating: true
    })
  }

  onCancel = () => {
    this.setState({
      creating: false
    })
  }

  onConfirm = () => {
    this.setState({
      creating: false
    })
  }
  
  render() {
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
        <Modal title="Add Event" onConfirm={this.onConfirm} onCancel={this.onCancel} canCancel canConfirm>
          <p>Modal Content</p>
        </Modal>)}
        <div className="">
        <p>Share  your own Events!</p>
          <ButtonContainer onClick={this.createEventHandler}>Create Event</ButtonContainer>
        </div>
      </React.Fragment>
    )
  }
}
export default Events