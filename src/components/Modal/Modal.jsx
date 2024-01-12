import { createPortal } from 'react-dom';
import { ModalStyle, Overlay } from './Modal.styled';
import { useEffect } from 'react';

const Modal = ({ closeModal, children }) => {
    const modal = document.getElementById('modal-root');

    useEffect(() => {
        const handleKeyClose = ({ code }) => {
            if (code === 'Escape') {
                closeModal();
            }
        };

        const handleOverlayClose = ({ target, currentTarget }) => {
            if (target === currentTarget) {
                closeModal();
            }
        };

        document.addEventListener('keydown', handleKeyClose);
        modal.firstChild.addEventListener('click', handleOverlayClose);

        return () => {
            document.removeEventListener('keydown', handleKeyClose);
        };
    }, [closeModal, modal]);

    return createPortal(
        <Overlay>
            <ModalStyle>{children}</ModalStyle>
        </Overlay>,
        modal
    );
};

export default Modal;
