import React from 'react';

import logo from '../ressources/img/logo.svg';

class Navbar extends React.Component {
    render()    {
        return(
            <div className="row" id="navbar">
                <div className="col-md-3" id="navbarLogo">
                    <img src={logo}/>
                </div>
                <div className="col-md-6" id="navbarSearch">
                    <form>
                        <input type="text" id="navbarSearchTextInput" placeholder="Bliblablubb"/>
                        <a role="button" className="btn btn-info" onclick="">Suchen</a>
                    </form>
                </div>
                <div className="col-md-2" id="navbarSellButton">
                    <a role="button" className="btn btn-success" onclick="">Verkaufen</a>
                </div>
                <div className="col-md-1" id="navbarUserIcon">
                    Bild
                </div>
            </div>
        )
    }
}

export default Navbar;