import React from 'react';
import {Link} from "react-router-dom";

import './navigation.css'
const Navigation = () => {
    return (
        <nav className={'nav'}>
            <span>
                <Link to={'/'}>home</Link>
            </span>
        </nav>
    );
};

export default Navigation;