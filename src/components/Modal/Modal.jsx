import { createPortal } from 'react-dom';
import { ModalStyle, Overlay } from './Modal.styled';

const Modal = ({ closeModal, children }) => {
    const modal = document.getElementById('modal-root');

    return createPortal(
        <Overlay>
            <ModalStyle>{children}</ModalStyle>
        </Overlay>,
        modal
    );
};

export default Modal;
