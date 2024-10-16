import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../Components/Home/Banner";
import PopularMovies from "../Components/Home/PopularMovies";
import Promos from "../Components/Home/Promos";
import TopRated from "../Components/Home/TopRated";
import Layout from "../Layout/Layout";
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedMoviesAction,
} from "../Redux/Actions/MoviesActions";

function HomeScreen() {
  const dispatch = useDispatch();
  // random
  const {
    isLoading: randomLoading,
    isError: randomError,
    movies: randomMovies,
  } = useSelector((state) => state.randomMovies);
  // top rated
  const {
    isLoading: ratedLoading,
    isError: ratedError,
    movies: ratedMovies,
  } = useSelector((state) => state.topRatedMovies);
  // all movies
  const { isLoading, isError, movies } = useSelector(
    (state) => state.moviesList
  );

  useEffect(() => {
    // get random movies
    dispatch(getRandomMoviesAction());
    // get all movies
    dispatch(getAllMoviesAction({}));
    // get all top rated
    dispatch(getTopRatedMoviesAction());
    // errors
    if (isError || randomError || ratedError) {
      toast.error(isError || randomError || ratedError);
    }
  }, [dispatch, isError, randomError, ratedError]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <PopularMovies movies={randomMovies} isLoading={randomLoading} />
        <Promos />
        <TopRated movies={ratedMovies} isLoading={ratedLoading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
