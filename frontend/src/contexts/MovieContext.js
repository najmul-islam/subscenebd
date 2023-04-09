import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// url endpoint
const TMDB_API = process.env.REACT_APP_TMDB_API;
const SEARCH_API = process.env.REACT_APP_MOVIES_SEARCH_URL;
const MOVIES_URL = process.env.REACT_APP_MOVIES_URL;

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  // moives from database
  // const [movies, setMovies] = useState([]);

  // movies
  const [movie, setMovie] = useState({});
  const [movieId, setMovieId] = useState();
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [subtitle, setSubtitle] = useState("");

  const [search, setSearch] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);

  // const getDbMovies = async (api) => {
  //   try {
  //     const response = await axios.get(api);
  //     const movies = await response.data.movies;
  //     setMovies(movies);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getMovies = async (API) => {
    try {
      const response = await axios.get(API);
      const movies = await response.data.results;
      setSearchMovies(movies);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleMovie = async (id) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?${TMDB_API}`
      );
      const movie = await response.data;
      setMovie(movie);
      const genres = movie.genres.map((genre) => genre.name);
      const languages = movie.spoken_languages.map(
        (language) => language.english_name
      );
      setGenres(genres);
      setLanguages(languages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMovie({});
    getMovies(SEARCH_API + search);
  };

  const handleMovie = (id) => {
    getSingleMovie(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subtitle", subtitle);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/subtitles",
        formData
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMovieSub = (e) => {
    if (e.target.files.length !== 0) {
      setSubtitle(e.target.files[0]);
    }
  };
  // useEffect(() => {
  //   getDbMovies(MOVIES_URL);
  // }, []);

  return (
    <MovieContext.Provider
      value={{
        movie,
        setMovie,
        // movies,
        search,
        setSearch,
        searchMovies,
        setSearchMovies,
        genres,
        languages,
        movieId,
        setMovieId,
        subtitle,
        setSubtitle,
        handleMovieSub,
        handleMovie,
        handleSearch,
        handleSubmit,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
