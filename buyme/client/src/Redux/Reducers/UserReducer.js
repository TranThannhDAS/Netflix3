import * as UserConstant from "../Constants/UserConstant";

// LOGIN
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConstant.USER_LOGIN_REQUEST:
      return { isLoading: true };
    case UserConstant.USER_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case UserConstant.USER_LOGIN_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstant.USER_LOGIN_RESET:
      return {};
    case UserConstant.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// REGISTER
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConstant.USER_REGISTER_REQUEST:
      return { isLoading: true };
    case UserConstant.USER_REGISTER_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case UserConstant.USER_REGISTER_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstant.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

// USER RESET PASSWORD
export const userChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConstant.USER_CHANGE_PASSWORD_REQUEST:
      return { isLoading: true };
    case UserConstant.USER_CHANGE_PASSWORD_SUCCESS:
      return {
        isLoading: false,
        message: action.payload.message,
        isSuccess: true,
      };
    case UserConstant.USER_CHANGE_PASSWORD_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstant.USER_CHANGE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE PROFILE
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConstant.USER_DELETE_REQUEST:
      return { isLoading: true };
    case UserConstant.USER_DELETE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case UserConstant.USER_DELETE_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstant.USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE PROFILE
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConstant.USER_UPDATE_PROFILE_REQUEST:
      return { isLoading: true };
    case UserConstant.USER_UPDATE_PROFILE_SUCCESS:
      return { isLoading: false, isSuccess: true, userInfo: action.payload };
    case UserConstant.USER_UPDATE_PROFILE_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstant.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

// USER LIKE MOVIE
export const userLikeMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConstant.USER_LIKE_MOVIE_REQUEST:
      return { isLoading: true };
    case UserConstant.USER_LIKE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case UserConstant.USER_LIKE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstant.USER_LIKE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// USER GET ALL LIKED MOVIES
export const userGetLikedMoviesReducer = (
  state = {
    likedMovies: [],
  },
  action
) => {
  switch (action.type) {
    case UserConstant.USER_GET_LIKED_MOVIES_REQUEST:
      return { isLoading: true };
    case UserConstant.USER_GET_LIKED_MOVIES_SUCCESS:
      return { isLoading: false, likedMovies: action.payload };
    case UserConstant.USER_GET_LIKED_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstant.USER_GET_LIKED_MOVIES_RESET:
      return { likedMovies: [] };
    default:
      return state;
  }
};

// USER DELETE ALL LIKED MOVIES
export const userDeleteLikedMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConstant.DELETE_ALL_FAVORITES_REQUEST:
      return { isLoading: true };
    case UserConstant.DELETE_ALL_FAVORITES_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case UserConstant.DELETE_ALL_FAVORITES_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstant.DELETE_ALL_FAVORITES_RESET:
      return {};
    default:
      return state;
  }
};

// ADMIN GET ALL USERS
export const adminGetAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case UserConstant.GET_ALL_USERS_REQUEST:
      return { isLoading: true };
    case UserConstant.GET_ALL_USERS_SUCCESS:
      return { isLoading: false, users: action.payload };
    case UserConstant.GET_ALL_USERS_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstant.GET_ALL_USERS_RESET:
      return { users: [] };
    default:
      return state;
  }
};

// ADMIN DELETE USER
export const adminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConstant.DELETE_USER_REQUEST:
      return { isLoading: true };
    case UserConstant.DELETE_USER_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case UserConstant.DELETE_USER_FAIL:
      return { isLoading: false, isError: action.payload };
    case UserConstant.DELETE_USER_RESET:
      return {};
    default:
      return state;
  }
};
