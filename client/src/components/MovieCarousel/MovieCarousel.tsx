import React from 'react';
import { MovieThumbnail } from '../MovieThumbnail/MovieThumbnail';
import './MovieCarousel.css';

interface Movie {
  id: number;
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
  handleSetWatchlist: (movie: Movie) => void;
  watchlistPage: boolean;
  watchlist: Movie[];
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  newReleasedMovies,
  topRatedMovies,
  upcomingMovies,
  username,
  queryResult,
  queryString,
  handleSetWatchlist,
  watchlistPage,
  watchlist,
}) => {
  return (
    <section className="movie-board">
      {queryResult && !watchlistPage && (
        <>
          {queryString && (
            <h1 className="movie-board__heading">Results for: {queryString}</h1>
          )}
          <section className="movie-carousel">
            {queryResult
              .filter(movie => movie.poster_path)
              .map(movie => (
                <MovieThumbnail
                  movie={movie}
                  username={username}
                  handleSetWatchlist={handleSetWatchlist}
                  watchlist={watchlist}
                />
              ))}
          </section>
        </>
      )}
      {!watchlistPage && (
        <>
          <h1 className="movie-board__heading">New Releases</h1>
          <section className="movie-carousel">
            {newReleasedMovies.map(movie => {
              return (
                <MovieThumbnail
                  movie={movie}
                  username={username}
                  handleSetWatchlist={handleSetWatchlist}
                  watchlist={watchlist}
                />
              );
            })}
          </section>
          <h1 className="movie-board__heading">Top Rated</h1>
          <section className="movie-carousel">
            {topRatedMovies.map(movie => {
              return (
                <MovieThumbnail
                  movie={movie}
                  username={username}
                  handleSetWatchlist={handleSetWatchlist}
                  watchlist={watchlist}
                />
              );
            })}
          </section>
          <h1 className="movie-board__heading">Upcoming</h1>
          <section className="movie-carousel">
            {upcomingMovies.map(movie => {
              return (
                <MovieThumbnail
                  movie={movie}
                  username={username}
                  handleSetWatchlist={handleSetWatchlist}
                  watchlist={watchlist}
                />
              );
            })}
          </section>
        </>
      )}
      {watchlistPage && (
        <>
          <h1 className="movie-board__heading">Your Watchlist</h1>
          <section className="movie-carousel">
            {watchlist.length > 0 ? (
              watchlist.map(movie => (
                <MovieThumbnail
                  movie={movie}
                  username={username}
                  handleSetWatchlist={handleSetWatchlist}
                  watchlist={watchlist}
                />
              ))
            ) : (
              <p>No movies</p>
            )}
          </section>
        </>
      )}
    </section>
  );
};
