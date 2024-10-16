// this page is for movies reducers

import * as MoviesConstant from "../Constants/MoviesConstants";

// GET ALL MOVIES

export const moviesListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MoviesConstant.MOVIES_LIST_REQUEST:
      return { isLoading: true };
    case MoviesConstant.MOVIES_LIST_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload.movies,
        pages: action.payload.pages,
        page: action.payload.page,
        totalMovies: action.payload.totalMovies,
      };
    case MoviesConstant.MOVIES_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET RANDOM MOVIES
export const randomMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MoviesConstant.GET_RANDOM_REQUEST:
      return { isLoading: true };
    case MoviesConstant.GET_RANDOM_SUCCESS:
      return { isLoading: false, movies: action.payload };
    case MoviesConstant.GET_RANDOM_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET MOVIE BY ID

export const movieDetailsReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case MoviesConstant.MOVIE_DETAILS_REQUEST:
      return { ...state, isLoading: true };
    case MoviesConstant.MOVIE_DETAILS_SUCCESS:
      return { isLoading: false, movie: action.payload };
    case MoviesConstant.MOVIE_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstant.MOVIE_DETAILS_RESET:
      return { movie: {} };
    default:
      return state;
  }
};

// GET TOP RATED MOVIES

export const topRatedMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MoviesConstant.TOP_RATED_MOVIES_REQUEST:
      return { isLoading: true };
    case MoviesConstant.TOP_RATED_MOVIES_SUCCESS:
      return { isLoading: false, movies: action.payload };
    case MoviesConstant.TOP_RATED_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// REVIEW MOVIE

export const movieReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case MoviesConstant.MOVIE_REVIEW_REQUEST:
      return { isLoading: true };
    case MoviesConstant.MOVIE_REVIEW_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstant.MOVIE_REVIEW_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstant.MOVIE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE MOVIE

export const deleteMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case MoviesConstant.DELETE_MOVIE_REQUEST:
      return { isLoading: true };
    case MoviesConstant.DELETE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstant.DELETE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// DELETE ALL MOVIES

export const deleteAllMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case MoviesConstant.DELETE_ALL_MOVIES_REQUEST:
      return { isLoading: true };
    case MoviesConstant.DELETE_ALL_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstant.DELETE_ALL_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE MOVIE

export const createMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case MoviesConstant.CREATE_MOVIE_REQUEST:
      return { isLoading: true };
    case MoviesConstant.CREATE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstant.CREATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstant.CREATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// CASTS

export const castsReducer = (state = { casts: [] }, action) => {
  switch (action.type) {
    case MoviesConstant.ADD_CAST:
      return { casts: [...state.casts, action.payload] };
    case MoviesConstant.EDIT_CAST:
      // upadate cast in the array
      const updatedCasts = state.casts.map((cast) =>
        cast.id === action.payload.id ? action.payload : cast
      );
      return { casts: updatedCasts };

    case MoviesConstant.DELETE_CAST:
      return {
        ...state,
        casts: state.casts.filter((x) => x.id !== action.payload),
      };
    case MoviesConstant.RESET_CAST:
      return { casts: [] };
    default:
      return state;
  }
};

// UPDATE MOVIE
export const updateMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case MoviesConstant.UPDATE_MOVIE_REQUEST:
      return { isLoading: true };
    case MoviesConstant.UPDATE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstant.UPDATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstant.UPDATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};
