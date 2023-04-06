import React, {useContext, useState} from 'react';
import './Navbar.css'
import {UserContext} from "../../modules/Auth/UserContext/UserContext";
import UserModal from "../userModal/userModal";
import {Link} from "react-router-dom";
import {FILMS_ROUTE, LOGIN_ROUTE} from "../../modules/Auth/utils/consts";

const Navbar = () => {
    const user = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {logOut} = useContext(UserContext);


    return (
        <div className='navbar'>
            <div className="navbar__container">
                <div className='navbar__item'>LOGO</div>
                <div className='navbar__item'>
                    <input className='navbar__input'/>
                </div>
                <div className='navbar__item'>
                    {
                        user.isAuth ?
                            <img src={process.env.REACT_APP_API_URL + user.img} alt='user' width={30} height={30}
                                 onClick={() => setIsModalVisible(true)}/> : ''
                    }
                    <UserModal isOpen={isModalVisible} onClose={setIsModalVisible}/>
                    {
                        user.isAuth ? <Link to={FILMS_ROUTE} onClick={logOut}>Log Out</Link> :
                            <Link to={LOGIN_ROUTE}>Sign In / Sign Up </Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;