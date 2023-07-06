import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Searchbar } from './components/Searchbar/Searchbar';
import { MovieThumbnail } from './components/movieThumbnail/MovieThumbnail';
import { Footer } from './components/Footer/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Searchbar />
      <MovieThumbnail />
      <Footer />
    </>
  );
};

export default App;
