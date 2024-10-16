// express user router
import express from "express";
import * as moviesController from "../Controllers/MoviesController.js";
import { Admin, protect } from "../middleware/Auth.js";

const router = express.Router();
// *********** PUBLIC ROUTES ***********
router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovieById);
router.get("/rated/top", moviesController.getTopRatedMovies);
router.get("/random/all", moviesController.getRandomMovies);

// *********** PROTECTED ROUTES ***********
router.post("/:id/reviews", protect, moviesController.createMovieReview);

// *********** ADMIN ROUTES ***********
router.delete("/", protect, Admin, moviesController.deleteAllMovies);
router.put("/:id", protect, Admin, moviesController.updateMovie);
router.delete("/:id", protect, Admin, moviesController.deleteMovie);
router.post("/", protect, Admin, moviesController.createMovie);

export default router;
