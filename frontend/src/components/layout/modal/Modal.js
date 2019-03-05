import React from 'react'
import {ButtonContainer} from '../../layout/Button';

import './modal.css'

const Modal = props => {
  return (
    <div className="modal-container">
      <header className="modal-header text-info">{props.title}</header>
      <section className="modal-content-children">
        {props.children}
      </section>
      <section className="modal-actions">
        {props.canCancel && <ButtonContainer onClick={props.onCancel}>Cancel</ButtonContainer>}
        {props.canConfirm && <ButtonContainer onClick={props.onConfirm}>
          {props.confirmText}
        </ButtonContainer>}
      </section>
    </div>
  )
}
export default Modal;