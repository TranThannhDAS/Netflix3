import * as UserConstant from "../Constants/UserConstant";
import * as MovieConstants from "../Constants/MoviesConstants";
import * as UserApi from "../APIs/userServices";
import { ErrorsAction, tokenProtaction } from "../Protection";
import toast from "react-hot-toast";

// login action
const LoginAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: UserConstant.USER_LOGIN_REQUEST });
    const response = await UserApi.loginService(datas);
    dispatch({
      type: UserConstant.USER_LOGIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, UserConstant.USER_LOGIN_FAIL);
  }
};

// register action
const registerAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: UserConstant.USER_REGISTER_REQUEST });
    const response = await UserApi.registerService(data);
    dispatch({
      type: UserConstant.USER_REGISTER_SUCCESS,
      payload: response,
    });
    dispatch({ type: UserConstant.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, UserConstant.USER_REGISTER_FAIL);
  }
};

// logout action
const logoutAction = () => (dispatch) => {
  UserApi.logoutService();
  dispatch({ type: UserConstant.USER_LOGOUT });
  dispatch({ type: UserConstant.USER_DELETE_RESET });
  dispatch({ type: UserConstant.USER_REGISTER_RESET });
  dispatch({ type: UserConstant.USER_LOGIN_RESET });
  dispatch({ type: UserConstant.USER_UPDATE_PROFILE_RESET });
  dispatch({ type: UserConstant.USER_CHANGE_PASSWORD_RESET });
  dispatch({ type: UserConstant.USER_GET_LIKED_MOVIES_RESET });
  dispatch({ type: UserConstant.DELETE_ALL_FAVORITES_RESET });
  dispatch({ type: UserConstant.GET_ALL_USERS_RESET });
  dispatch({ type: UserConstant.DELETE_USER_RESET });
  dispatch({ type: MovieConstants.MOVIE_DETAILS_RESET });
  dispatch({ type: UserConstant.USER_GET_LIKED_MOVIES_RESET });
};

// delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: UserConstant.USER_DELETE_REQUEST });
    await UserApi.deleteProfileService(tokenProtaction(getState));
    dispatch({ type: UserConstant.USER_DELETE_SUCCESS });
    toast.success("Account Deleted ");
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, UserConstant.USER_DELETE_FAIL);
  }
};

// update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: UserConstant.USER_UPDATE_PROFILE_REQUEST });
    const response = await UserApi.updateProfileService(
      user,
      tokenProtaction(getState)
    );
    dispatch({
      type: UserConstant.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    toast.success("Profile Updated ");
    dispatch({ type: UserConstant.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, UserConstant.USER_UPDATE_PROFILE_FAIL);
  }
};

// change password action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
  try {
    dispatch({ type: UserConstant.USER_CHANGE_PASSWORD_REQUEST });
    const response = await UserApi.changePasswordService(
      passwords,
      tokenProtaction(getState)
    );
    dispatch({
      type: UserConstant.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, UserConstant.USER_CHANGE_PASSWORD_FAIL);
  }
};

// get all liked movies action
const getLikedMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: UserConstant.USER_GET_LIKED_MOVIES_REQUEST });
    const response = await UserApi.getLikedMoviesService(
      tokenProtaction(getState)
    );
    dispatch({
      type: UserConstant.USER_GET_LIKED_MOVIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, UserConstant.USER_GET_LIKED_MOVIES_FAIL);
  }
};
// user like movie movie action

const likeMovieAction = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: UserConstant.USER_LIKE_MOVIE_REQUEST });
    const response = await UserApi.likeMovieService(
      movieId,
      tokenProtaction(getState)
    );
    dispatch({
      type: UserConstant.USER_LIKE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie added to favorites ");
    dispatch(getLikedMoviesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, UserConstant.USER_LIKE_MOVIE_FAIL);
  }
};

// delete all liked movies action
const deleteLikedMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: UserConstant.DELETE_ALL_FAVORITES_REQUEST });
    await UserApi.deleteAllLikedMoviesService(tokenProtaction(getState));
    dispatch({ type: UserConstant.DELETE_ALL_FAVORITES_SUCCESS });
    toast.success("All Favorites Deleted ");
  } catch (error) {
    ErrorsAction(error, dispatch, UserConstant.DELETE_ALL_FAVORITES_FAIL);
  }
};

// Admin get all users action
const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: UserConstant.GET_ALL_USERS_REQUEST });
    const response = await UserApi.getAllUsersService(
      tokenProtaction(getState)
    );
    dispatch({
      type: UserConstant.GET_ALL_USERS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, UserConstant.GET_ALL_USERS_FAIL);
  }
};

// Admin delete user action
const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: UserConstant.DELETE_USER_REQUEST });
    await UserApi.deleteUserByIdService(id, tokenProtaction(getState));
    dispatch({ type: UserConstant.DELETE_USER_SUCCESS });
    toast.success("User Deleted ");
  } catch (error) {
    ErrorsAction(error, dispatch, UserConstant.DELETE_USER_FAIL);
  }
};

export {
  LoginAction,
  registerAction,
  logoutAction,
  deleteProfileAction,
  updateProfileAction,
  changePasswordAction,
  getLikedMoviesAction,
  deleteLikedMoviesAction,
  getAllUsersAction,
  deleteUserAction,
  likeMovieAction,
};
