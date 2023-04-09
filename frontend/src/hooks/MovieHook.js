import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

const useMovie = () => {
  return useContext(MovieContext);
};

export default useMovie;
