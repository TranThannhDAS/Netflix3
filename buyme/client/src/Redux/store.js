import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/UserReducer";
import * as Movies from "./Reducers/MoviesReducer";
import * as Categories from "./Reducers/CategoriesReducer";

const rootReducer = combineReducers({
  // user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userDeleteProfile: User.userDeleteReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  userChangePassword: User.userChangePasswordReducer,
  userGetLikedMovies: User.userGetLikedMoviesReducer,
  userLikeMovie: User.userLikeMovieReducer,
  deleteLikedMovies: User.userDeleteLikedMoviesReducer,
  getAllUsers: User.adminGetAllUsersReducer,
  deleteUser: User.adminDeleteUserReducer,
  // Movie reducers
  moviesList: Movies.moviesListReducer,
  randomMovies: Movies.randomMoviesReducer,
  movieDetails: Movies.movieDetailsReducer,
  topRatedMovies: Movies.topRatedMoviesReducer,
  reviewMovie: Movies.movieReviewReducer,
  deleteMovie: Movies.deleteMovieReducer,
  deleteAllMovies: Movies.deleteAllMoviesReducer,
  createMovie: Movies.createMovieReducer,
  addUpdateDeleteCasts: Movies.castsReducer,
  updateMovie: Movies.updateMovieReducer,
  // Category reducers
  categoriesList: Categories.categoriesListReducer,
  createCategory: Categories.createCategoryReducer,
  deleteCategory: Categories.deleteCategoryReducer,
  updateCategory: Categories.updateCategoryReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// casts
const castsFromLocalStorage = localStorage.getItem("casts")
  ? JSON.parse(localStorage.getItem("casts"))
  : [];

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
  addUpdateDeleteCasts: { casts: castsFromLocalStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
