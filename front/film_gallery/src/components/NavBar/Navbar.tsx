import React, {useContext} from 'react';
import './Navbar.css'
import {UserContext} from "../../modules/Auth/UserContext/UserContext";

const Navbar = () => {
    const user = useContext(UserContext);
    return (
        <div className='navbar'>
            <div className="navbar__container">
                <div className='navbar__item'>LOGO</div>
                <div className='navbar__item'>
                    <input className='navbar__input'/>
                </div>
                <div className='navbar__item'>
                    {
                        user.isAuth ? <img src={user.img} alt='user'/> : ''
                    }
                    <div>{user.isAuth ? 'Sign In / Sign Up ' : 'Log out'}</div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;