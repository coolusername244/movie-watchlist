import React from 'react';
import './MovieThumbnail.css';
interface Movie {
  title: string;
  overview: string;
  poster_path: string;
}
interface MovieThumbnailProps {
  movie: Movie;
}

export const MovieThumbnail: React.FC<MovieThumbnailProps> = ({ movie }) => {
  const movieImageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  return (
    <article className="movie-thumbnail">
      <img
        className="movie-thumbnail__img"
        src={movieImageUrl}
        alt={movie.title}
      />
      <h4 className="movie-thumbnail__title">{movie.title}</h4>
    </article>
  );
};
