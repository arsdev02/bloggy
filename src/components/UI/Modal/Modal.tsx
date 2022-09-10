import React from 'react';

import './modal.css';

interface ModalProps {
    children: React.ReactNode,
    title: string,
    onClose: () => void
}

const Modal = ({children, title, onClose}:ModalProps) => {
  return (
    <>
      <div className={'modal'}>
        <div className={'modal-bg'} onClick={onClose}/>
        <div className={'modal__box'}>
          <h2>{ title }</h2>
          {children}
        </div>
      </div>
    </>

  );
};

export default Modal;