import React from 'react';
import './Searchbar.css';

export const Searchbar = () => {
  return (
    <section className="search-section">
      <form className="search-section__form" action="">
        <input
          className="searchbar"
          type="text"
          placeholder="What would you like to watch?"
        />
      </form>
    </section>
  );
};
