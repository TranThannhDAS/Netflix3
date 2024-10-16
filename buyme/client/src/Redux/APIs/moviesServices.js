// this page is for the API calls for the movies

import Axios from "./Axios";

// get all movies Function
const getAllMoviesService = async (
  category,
  time,
  language,
  rate,
  year,
  search,
  pageNumber
) => {
  const { data } = await Axios.get(
    `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
  );
  return data;
};

// get random movies Function
const getRandomMoviesService = async () => {
  const { data } = await Axios.get("/movies/random/all");
  return data;
};

// get movie by id Function
const getMovieByIdService = async (id) => {
  const { data } = await Axios.get(`/movies/${id}`);
  return data;
};

// get top rated movies Function
const getTopRatedMoviesService = async () => {
  const { data } = await Axios.get("/movies/rated/top");
  return data;
};

// review movie Function
const reviewMovieService = async (token, id, review) => {
  const { data } = await Axios.post(`/movies/${id}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete movie Function
const deleteMovieService = async (token, id) => {
  const { data } = await Axios.delete(`/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete all movies Function
const deleteAllMoviesService = async (token) => {
  const { data } = await Axios.delete("/movies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// create movie Function
const createMovieService = async (token, movie) => {
  const { data } = await Axios.post("/movies", movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update movie Function
const updateMovieService = async (token, id, movie) => {
  const { data } = await Axios.put(`/movies/${id}`, movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  getAllMoviesService,
  getRandomMoviesService,
  getMovieByIdService,
  getTopRatedMoviesService,
  reviewMovieService,
  deleteMovieService,
  deleteAllMoviesService,
  createMovieService,
  updateMovieService,
};
