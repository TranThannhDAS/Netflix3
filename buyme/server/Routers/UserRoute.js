// express user router
import express from "express";
import {
  addLikedMovie,
  changeUserPassword,
  deleteLikedMovies,
  deleteUser,
  deleteUserProfile,
  getLikedMovies,
  getUsers,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../Controllers/UserControler.js";
import { Admin, protect } from "../middleware/Auth.js";

const router = express.Router();

// ******** PUBLIC ROUTES ********
router.post("/", registerUser);
router.post("/login", loginUser);

// ******** PRIVATE ROUTES ********
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikedMovies);
router.post("/favorites", protect, addLikedMovie);
router.delete("/favorites", protect, deleteLikedMovies);

// ******** ADMIN ROUTES ********
router.get("/", protect, Admin, getUsers);
router.delete("/:id", protect, Admin, deleteUser);

export default router;
