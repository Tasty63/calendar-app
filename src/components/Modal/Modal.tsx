import React from 'react';
import ReactDom from 'react-dom';
import { ModalProps } from '../../types/calendar-types';
import './Modal.scss';

const modalRoot = document.getElementById('modal-root');

function Modal({ isActive, setActive, children }: ModalProps) {
  return isActive
    ? ReactDom.createPortal(
        <div className="modal" onClick={() => setActive(false)}>
          <div className="modal__content" onClick={(event) => event.stopPropagation()}>
            {children}
          </div>
        </div>,
        modalRoot as Element
      )
    : null;
}

export default Modal;