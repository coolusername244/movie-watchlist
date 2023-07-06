import React from 'react';
import './Signin.css';

export const Signin = () => {
  return (
    <section className="signin-section">
      <form className="signin-form" action="">
        <input
          className="signin-form__input"
          type="text"
          placeholder="Username"
        />
        <input className="signin-form__button" type="submit" value="Sign In" />
      </form>
    </section>
  );
};
