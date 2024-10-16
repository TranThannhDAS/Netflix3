// this page is for movies actions

import toast from "react-hot-toast";
import * as MovieApi from "../APIs/moviesServices";
import * as MoviesConstant from "../Constants/MoviesConstants";
import { ErrorsAction, tokenProtaction } from "../Protection";

// get all movies action
export const getAllMoviesAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: MoviesConstant.MOVIES_LIST_REQUEST });
      const response = await MovieApi.getAllMoviesService(
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber
      );
      dispatch({ type: MoviesConstant.MOVIES_LIST_SUCCESS, payload: response });
    } catch (error) {
      ErrorsAction(error, dispatch, MoviesConstant.MOVIES_LIST_FAIL);
    }
  };

// get random movies action
export const getRandomMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstant.GET_RANDOM_REQUEST });
    const response = await MovieApi.getRandomMoviesService();
    dispatch({ type: MoviesConstant.GET_RANDOM_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstant.GET_RANDOM_FAIL);
  }
};

// get movie by id action
export const getMovieByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstant.MOVIE_DETAILS_REQUEST });
    const response = await MovieApi.getMovieByIdService(id);
    dispatch({ type: MoviesConstant.MOVIE_DETAILS_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstant.MOVIE_DETAILS_FAIL);
  }
};

// get top rated movies action
export const getTopRatedMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstant.TOP_RATED_MOVIES_REQUEST });
    const response = await MovieApi.getTopRatedMoviesService();
    dispatch({
      type: MoviesConstant.TOP_RATED_MOVIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstant.TOP_RATED_MOVIES_FAIL);
  }
};

// review movie action
export const reviewMovieAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: MoviesConstant.MOVIE_REVIEW_REQUEST });
      const response = await MovieApi.reviewMovieService(
        tokenProtaction(getState),
        id,
        review
      );
      dispatch({
        type: MoviesConstant.MOVIE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success(`Review added successfully`);
      dispatch({ type: MoviesConstant.MOVIE_REVIEW_RESET });
      dispatch(getMovieByIdAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, MoviesConstant.MOVIE_REVIEW_FAIL);
    }
  };

// delete movie action

export const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstant.DELETE_MOVIE_REQUEST });
    const response = await MovieApi.deleteMovieService(
      tokenProtaction(getState),
      id
    );
    dispatch({
      type: MoviesConstant.DELETE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success(`Movie deleted successfully`);
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstant.DELETE_MOVIE_FAIL);
  }
};

// delete all movies action
export const deleteAllMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstant.DELETE_ALL_MOVIES_REQUEST });
    const response = await MovieApi.deleteAllMoviesService(
      tokenProtaction(getState)
    );
    dispatch({
      type: MoviesConstant.DELETE_ALL_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success(`All movies deleted successfully`);
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstant.DELETE_ALL_MOVIES_FAIL);
  }
};

// create movie action
export const createMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstant.CREATE_MOVIE_REQUEST });
    const response = await MovieApi.createMovieService(
      tokenProtaction(getState),
      movie
    );
    dispatch({
      type: MoviesConstant.CREATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success(`Movie created successfully`);
    dispatch(deleteAllCasts());
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstant.CREATE_MOVIE_FAIL);
  }
};

// update movie action
export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstant.UPDATE_MOVIE_REQUEST });
    const response = await MovieApi.updateMovieService(
      tokenProtaction(getState),
      id,
      movie
    );
    dispatch({
      type: MoviesConstant.UPDATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success(`Movie updated successfully`);
    dispatch(getMovieByIdAction(id));
    dispatch(deleteAllCasts());
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstant.UPDATE_MOVIE_FAIL);
  }
};

// ***** CASTS ACTIONS *****

// add cast
export const addCasts = (cast) => async (dispatch, getState) => {
  dispatch({
    type: MoviesConstant.ADD_CAST,
    payload: cast,
  });

  localStorage.setItem(
    "casts",
    JSON.stringify(getState().addUpdateDeleteCasts.casts)
  );
};

// remove cast
export const removeCast = (id) => (dispatch, getState) => {
  dispatch({
    type: MoviesConstant.DELETE_CAST,
    payload: id,
  });
  localStorage.setItem(
    "casts",
    JSON.stringify(getState().addUpdateDeleteCasts.casts)
  );
};

// update cast
export const updateCast = (cast) => (dispatch, getState) => {
  dispatch({
    type: MoviesConstant.EDIT_CAST,
    payload: cast,
  });
  localStorage.setItem(
    "casts",
    JSON.stringify(getState().addUpdateDeleteCasts.casts)
  );
};

// delete all casts
export const deleteAllCasts = () => (dispatch) => {
  dispatch({
    type: MoviesConstant.RESET_CAST,
  });
  localStorage.removeItem("casts");
};
