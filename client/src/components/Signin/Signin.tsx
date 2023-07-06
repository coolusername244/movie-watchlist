import React, { FormEvent, useRef } from 'react';
import './Signin.css';
import axios from 'axios';

type SigninProps = {
  handleSetUsername: (username: string) => void;
  handleGoToHomePage: () => void;
};
export const Signin: React.FC<SigninProps> = ({
  handleSetUsername,
  handleGoToHomePage,
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    if (!username) return;
    try {
      await axios.post('http://localhost:8000/api/users', {
        username,
      });
      handleSetUsername(username);
      handleGoToHomePage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="signin-section">
      <form onSubmit={handleSubmit} className="signin-form" action="">
        <input
          ref={usernameRef}
          className="signin-form__input"
          type="text"
          placeholder="Username"
        />
        <input className="signin-form__button" type="submit" value="Sign In" />
      </form>
    </section>
  );
};
