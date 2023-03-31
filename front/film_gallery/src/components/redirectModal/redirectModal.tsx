import React from 'react';
import './redirectModal.css'
interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
const RedirectModal: React.FC<ModalProps>  = ({ title, isOpen, onClose, children}) => {

    return isOpen ? (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose}>
                        X
                    </button>
                </div>
                <div className="modal-content">{children}</div>
            </div>
        </div>
    ) : null;
}
export default RedirectModal;