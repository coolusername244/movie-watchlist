import React from 'react';
import './Navbar.css';

type NavbarProps = {
  handleSignInPage: () => void;
  handleGoToHomePage: () => void;
  handleSignUpPage: () => void;
  handleSignOut: () => void;
  username: string;
  handleWatchlist: () => void;
  getUsersWatchlist: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({
  handleSignInPage,
  handleGoToHomePage,
  username,
  handleSignUpPage,
  handleSignOut,
  handleWatchlist,
}) => {
  return (
    <header className="navbar">
      <ul className="navbar-list">
        <li onClick={handleGoToHomePage} className="navbar-list__item">
          home
        </li>
        {/* <li className="navbar-list__item">action</li>
        <li className="navbar-list__item">comedy</li>
        <li className="navbar-list__item">drama</li>
        <li className="navbar-list__item">horror</li> */}
        {!username && (
          <>
            <li onClick={handleSignInPage} className="navbar-list__item">
              Sign In
            </li>
            <li onClick={handleSignUpPage} className="navbar-list__item">
              Sign Up
            </li>
          </>
        )}
        {username && (
          <>
            <li onClick={handleWatchlist} className="navbar-list__item">
              watchlist
            </li>
            <li onClick={handleSignOut} className="navbar-list__item">
              Sign Out
            </li>
          </>
        )}
      </ul>
    </header>
  );
};
