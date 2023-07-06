import React, { FormEvent, useRef, useState } from 'react';
import './Signup.css';
import axios from 'axios';

type SignupProps = {
  handleSetUsername: (username: string) => void;
  handleGoToHomePage: () => void;
};
export const Signup: React.FC<SignupProps> = ({
  handleSetUsername,
  handleGoToHomePage,
}) => {
  const [error, setError] = useState('');
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    if (!username) return;
    try {
      const response = await axios.post('http://localhost:8000/api/users', {
        username,
      });
      console.log(response);
      handleSetUsername(username);
      handleGoToHomePage();
    } catch (error) {
      setError(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  return (
    <section className="signin-section">
      <form onSubmit={handleSubmit} className="signin-form" action="">
        <h2>Sign Up</h2>
        <input
          ref={usernameRef}
          className="signin-form__input"
          type="text"
          placeholder="Username"
        />
        <input className="signin-form__button" type="submit" value="Sign In" />
        {error && <p>{error}</p>}
      </form>
    </section>
  );
};
