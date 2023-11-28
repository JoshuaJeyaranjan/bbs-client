import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

import Navbar from 'react-bootstrap/Navbar';

const Nav = () => {
    return (
        
            <Navbar className='nav bg-body-tertiary'>
            
                <NavLink className={'nav__link'} to="/">Home</NavLink>
                <NavLink className={'nav__link'} to="/teams">Teams</NavLink>
                <NavLink className={'nav__link'} to="/players">Players</NavLink>
            </Navbar>
        
  
    );
};

export default Nav;
