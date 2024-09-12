import React, { useState } from 'react';
import './App.css';
import default1 from './assets/project1.jpg'; // Default image path

const API_KEY = "3ec68b63";
const BASE_URL = "https://www.omdbapi.com/";

const MovieCard = ({ movie }) => {
  const { Title, Poster, imdbID, Year } = movie;
  const [movieDetails, setMovieDetails] = useState(null);

  const getMovieDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <div className="movie" onClick={getMovieDetails}>
      <img src={Poster !== 'N/A' ? Poster : default1} alt={Title} />
      <div className="movie-info">
        <h3>{Title}</h3>
        <span className="year">{Year}</span>
      </div>

      {movieDetails && (
        <div className="overview">
          <h3>Overview</h3>
          <p>{movieDetails.Plot}</p>
          <ul>
            <li><strong>Genre:</strong> {movieDetails.Genre}</li>
            <li><strong>Director:</strong> {movieDetails.Director}</li>
            <li><strong>Actors:</strong> {movieDetails.Actors}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
