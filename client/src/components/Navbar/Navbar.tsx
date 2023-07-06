import React from 'react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <ul className="navbar-list">
        <li className="navbar-list__item">home icon</li>
        <li className="navbar-list__item">action</li>
        <li className="navbar-list__item">comedy</li>
        <li className="navbar-list__item">drama</li>
        <li className="navbar-list__item">horror</li>
      </ul>
    </header>
  );
};
