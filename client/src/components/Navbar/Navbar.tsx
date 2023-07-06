import React from 'react';
import './Navbar.css';

type NavbarProps = {
  handleSignInPage: () => void;
  handleGoToHomePage: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({
  handleSignInPage,
  handleGoToHomePage,
}) => {
  return (
    <header className="navbar">
      <ul className="navbar-list">
        <li onClick={handleGoToHomePage} className="navbar-list__item">
          home icon
        </li>
        <li className="navbar-list__item">action</li>
        <li className="navbar-list__item">comedy</li>
        <li className="navbar-list__item">drama</li>
        <li className="navbar-list__item">horror</li>
        <li onClick={handleSignInPage} className="navbar-list__item">
          Sign In
        </li>
      </ul>
    </header>
  );
};
