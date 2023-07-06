import React from 'react';
import { MovieThumbnail } from '../MovieThumbnail/MovieThumbnail';
import './MovieCarousel.css';

interface Movie {
  title: string;
  overview: string;
  poster_path: string;
}

interface MovieCarouselProps {
  newReleasedMovies: Movie[];
  topRatedMovies: Movie[];
  upcomingMovies: Movie[];
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  newReleasedMovies,
  topRatedMovies,
  upcomingMovies,
}) => {
  return (
    <section className="movie-board">
      <h1 className="movie-board__heading">New Releases</h1>
      <section className="movie-carousel">
        {newReleasedMovies.map(movie => {
          return <MovieThumbnail movie={movie} />;
        })}
      </section>
      <h1 className="movie-board__heading">Top Rated</h1>
      <section className="movie-carousel">
        {topRatedMovies.map(movie => {
          return <MovieThumbnail movie={movie} />;
        })}
      </section>
      <h1 className="movie-board__heading">Upcoming</h1>
      <section className="movie-carousel">
        {upcomingMovies.map(movie => {
          return <MovieThumbnail movie={movie} />;
        })}
      </section>
    </section>
  );
};
