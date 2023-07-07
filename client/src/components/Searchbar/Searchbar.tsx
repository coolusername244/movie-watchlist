import React, { FormEvent, useRef, useState } from 'react';
import './Searchbar.css';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

type SeachbarProps = {
  handleSetQuery: (query: Movie[], queryString: string) => void;
  username: string;
};
export const Searchbar: React.FC<SeachbarProps> = ({
  handleSetQuery,
  username,
}) => {
  const [error, setError] = useState('');

  const queryStringRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const query = queryStringRef.current?.value;
    if (!query) return;
    try {
      const response = await axios.get('http://localhost:8000/api/movie', {
        params: { query: query },
      });
      if (response.data.length === 0) {
        throw new Error('No movie with this name');
      }
      console.log(response);
      handleSetQuery(response.data, query);
      setError('');
    } catch (error) {
      setError(error as string);
      console.log(error);
    }
  };

  return (
    <section className="search-section">
      <form onSubmit={handleSubmit} className="search-section__form" action="">
        <input
          ref={queryStringRef}
          className="searchbar"
          type="text"
          placeholder="What would you like to watch?"
        />
        {error && <p>No such movie</p>}
        {!username && <p>Log in to add a movie to watchlist</p>}
      </form>
    </section>
  );
};
