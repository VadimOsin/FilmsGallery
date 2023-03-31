import React, {useContext} from 'react';
import './userModal.css'
import {UserContext} from "../../modules/Auth/UserContext/UserContext";

interface ModalProps {
    isOpen: boolean;
    onClose: (isOpen: boolean) => void;
}

const UserModal: React.FC<ModalProps> = ({isOpen, onClose}) => {
    const user = useContext(UserContext);

    return isOpen ? (
        <div className="user__modal-overlay" onClick={() => onClose(false)}>
            <div className="user__modal">
                <div className="user__modal-content">
                    <img src={process.env.REACT_APP_API_URL + user.img} alt='user' width={30} height={30}/>
                    <div>{user.name} {user.surname}</div>
                    <div>{user.email}</div>
                </div>

            </div>
        </div>
    ) : null;
};

export default UserModal;