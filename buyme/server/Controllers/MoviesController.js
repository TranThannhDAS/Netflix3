// movies Function Controller
import asyncHandler from "express-async-handler";
import Movie from "../Models/MoviesModal.js";

// *********** PUBLIC CONTOLLERS ***********
// @desc    Get all movies
// @route   GET /api/movies
// @access  Public

const getMovies = asyncHandler(async (req, res) => {
  try {
    // filter movies by category, time, language, rate, year and search
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };

    // load more movies functionalty
    const page = Number(req.query.pageNumber) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    // find movies by query and skip and limit
    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // get total movies
    const count = await Movie.countDocuments(query);
    // send response to client with movies and total movies
    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit),
      totalMovies: count,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// @desc    Get movie by id
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = asyncHandler(async (req, res) => {
  try {
    // find the movie by id
    const movie = await Movie.findById(req.params.id);
    // if the movie found send it to the client
    if (movie) {
      res.json(movie);
    }
    // else send error message to the client
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// @desc    Get top rated movies
// @route   GET /api/movies/rated/top
// @access  Public
const getTopRatedMovies = asyncHandler(async (req, res) => {
  try {
    // find top rated movies
    const movies = await Movie.find({}).sort({ rate: -1 });
    // send movies to the client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get random movies
// @route   GET /api/movies/random
// @access  Public
const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    // find random movies
    const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
    // send movies to the client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ************ PROTECTED CONTOLLERS ************
// @desc    Create new review
// @route   POST /api/movies/:id/reviews
// @access  Private
const createMovieReview = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const { rating, comment } = req.body;
    // get movie by id
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // check if user already reviewed this movie
      const alreadyReviewed = movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You already rate this movie");
      }
      // create new review
      const review = {
        userName: req.user.fullName,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
        userId: req.user._id,
      };

      // add new review to movie
      movie.reviews.push(review);

      // update number of reviews
      movie.numberOfReviews = movie.reviews.length;

      // update rate
      movie.rate =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      // save movie in database
      await movie.save();
      // send updated movie
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ************ ADMIN CONTOLLERS ************

// @desc    Delete all movies
// @route   DELETE /api/movies
// @access  Private/Admin
const deleteAllMovies = asyncHandler(async (req, res) => {
  try {
    // delete all movies
    await Movie.deleteMany({});
    res.json({ message: "All movies removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private/Admin
const updateMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      image,
      desc,
      titleImage,
      rate,
      numberOfReviews,
      category,
      language,
      year,
      time,
      video,
      casts,
    } = req.body;

    // get movie by id
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // update movie
      movie.name = name || movie.name;
      movie.image = image || movie.image;
      movie.desc = desc || movie.desc;
      movie.titleImage = titleImage || movie.titleImage;
      movie.rate = rate || movie.rate;
      movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
      movie.category = category || movie.category;
      movie.language = language || movie.language;
      movie.year = year || movie.year;
      movie.time = time || movie.time;
      movie.video = video || movie.video;
      movie.casts = casts || movie.casts;

      // save movie in database
      const updatedMovie = await movie.save();
      // send updated movie
      res.status(201).json(updatedMovie);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
const deleteMovie = asyncHandler(async (req, res) => {
  try {
    // find the movie by id
    const movie = await Movie.findById(req.params.id);
    // if the movie found delete it
    if (movie) {
      await movie.remove();
      res.json({ message: "Movie removed" });
    }
    // else send error message to the client
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Create movie
// @route   POST /api/movies
// @access  Private/Admin
const createMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      image,
      desc,
      titleImage,
      rate,
      numberOfReviews,
      category,
      language,
      year,
      time,
      video,
      casts,
    } = req.body;

    // create new movie
    const movie = new Movie({
      name,
      image,
      desc,
      titleImage,
      rate,
      numberOfReviews,
      category,
      language,
      year,
      time,
      video,
      casts,
      userId: req.user._id,
    });
    if (movie) {
      // save movie in database
      const createdMovie = await movie.save();
      // send created movie
      res.status(201).json(createdMovie);
    } else {
      res.status(400);
      throw new Error("Invalid movie data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  getMovies,
  getMovieById,
  getTopRatedMovies,
  createMovieReview,
  deleteAllMovies,
  updateMovie,
  deleteMovie,
  createMovie,
  getRandomMovies,
};
