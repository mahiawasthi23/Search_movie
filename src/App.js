import React, { useState } from 'react';
import './App.css';
import default1 from './assets/project1.jpg';
import MovieCard from './MovieCard';

const API_KEY = "3ec68b63";
const BASE_URL = "https://www.omdbapi.com/";

const defaultMovies = [
  {
    Title: "Default Movie 1",
    Poster: default1,
    imdbID: "tt0000001",
    Year: "2024",
  },
  {
    Title: "Default Movie 2",
    Poster: default1,
    imdbID: "tt0000002",
    Year: "2024",
  },
  {
    Title: "Default Movie 3",
    Poster: default1,
    imdbID: "tt0000003",
    Year: "2024",
  },
];

function App() {
  const [movies, setMovies] = useState(defaultMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const searchMovies = async (term) => {
    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${term}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setError('');
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      searchMovies(searchTerm);
      setSearchTerm('');
    }
  };

  return (
    <>
      <header>
        <div className="tital">
          <h1>Movie API</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search"
            className="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </header>

      <main id="main">
        {error && <h2 className="no-results">{error}</h2>}
        {movies.length > 0 && movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </main>
    </>
  );
}

export default App;
