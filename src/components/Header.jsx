import React from 'react';
import logo from '../img/logo.png';

const Header = () => (
  <header className="header">
    <div className="header__wrapper">
      <div className="header__logo">
        <a href="#film-list" className="header__logo-link">
          <img
            src={logo}
            alt="Movies"
            className="header__logo-pic"
          />
        </a>
      </div>
    </div>
  </header>
);

export default Header;
