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
  username: string;
  queryResult: Movie[] | null;
  queryString: string;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  newReleasedMovies,
  topRatedMovies,
  upcomingMovies,
  username,
  queryResult,
  queryString,
}) => {
  return (
    <section className="movie-board">
      {queryResult && (
        <>
          {queryString && (
            <h1 className="movie-board__heading">Results for: {queryString}</h1>
          )}
          <section className="movie-carousel">
            {queryResult
              .filter(movie => movie.poster_path)
              .map(movie => (
                <MovieThumbnail movie={movie} username={username} />
              ))}
          </section>
        </>
      )}
      <h1 className="movie-board__heading">New Releases</h1>
      <section className="movie-carousel">
        {newReleasedMovies.map(movie => {
          return <MovieThumbnail movie={movie} username={username} />;
        })}
      </section>
      <h1 className="movie-board__heading">Top Rated</h1>
      <section className="movie-carousel">
        {topRatedMovies.map(movie => {
          return <MovieThumbnail movie={movie} username={username} />;
        })}
      </section>
      <h1 className="movie-board__heading">Upcoming</h1>
      <section className="movie-carousel">
        {upcomingMovies.map(movie => {
          return <MovieThumbnail movie={movie} username={username} />;
        })}
      </section>
    </section>
  );
};
