import * as React from "react";
import {NavLink} from "react-router-dom";

import logo from "./logo.svg";

const Header: React.SFC = () => {
    return (
        <header className="header">
            <img src={logo} className="header-logo" alt="logo" />
            <h1 className="header-title">React Shop</h1>
            <nav>
                <NavLink 
                    to="/products" 
                    activeClassName="header-link-active"
                    className="header-link">Products</NavLink>
                <NavLink 
                    to="/admin" 
                    activeClassName="header-link-active"
                    className="header-link">Admin</NavLink>
            </nav>
        </header>
    );
};

export default Header;