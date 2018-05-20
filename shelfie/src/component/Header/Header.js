import React from 'react';
import {Link} from 'react-router-dom';
import shelfieLogo from '../../shelfie_icon.png';

function Header() {
    return (
        <div id="header">
            <div className="branding">
                <img src={shelfieLogo} />
                <Link to="/"><span>SHELFIE</span></Link>
            </div>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/form">Add to Inventory</Link>
            </nav>
        </div>
    );
}

export default Header;