import React from 'react';
import './MovieThumbnail.css';
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}
interface MovieThumbnailProps {
  movie: Movie;
  username: string;
  handleSetWatchlist: (movie: Movie) => void;
  watchlist: Movie[];
}

export const MovieThumbnail: React.FC<MovieThumbnailProps> = ({
  movie,
  username,
  handleSetWatchlist,
  watchlist,
}) => {
  console.log(watchlist);
  const movieImageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const addToWatchlist = (movie: Movie) => {
    handleSetWatchlist(movie);
  };

  return (
    <article className="movie-thumbnail">
      <span className="movie-thumbnail__id">{movie.id}</span>
      <img
        className="movie-thumbnail__img"
        src={movieImageUrl}
        alt={movie.title}
      />
      {username && (
        <button
          onClick={() => addToWatchlist(movie)}
          className="movie-thumbnail__button"
        >
          {/* {!watchlist && '+ Watchlist'} */}
          {watchlist && watchlist.find(item => item.id === movie.id)
            ? 'Remove'
            : '+ Watchlist'}
        </button>
      )}
      {/* {username && (
        <button
          onClick={() => addToWatchlist(movie)}
          className="movie-thumbnail__button"
        >
          Remove
        </button>
      )} */}
      <h4 className="movie-thumbnail__title">{movie.title}</h4>
    </article>
  );
};
