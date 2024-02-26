import React from 'react';
import logo from '../assets/logo_IntusCare.png';

const Header = () => {
    const headerStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        background: 'white',
        height: '60px',
        padding: '10px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    };

    const imgStyle = {
        margin: '10px',
        maxHeight: '50px'
    };

    return (
        <header style={headerStyle}>
            <img style={imgStyle} src={logo} alt="Intus Logo" />
        </header>
    );
};

export default Header;