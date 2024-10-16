// express user router
import express from "express";
import { Admin, protect } from "../middleware/Auth.js";
import * as categoryController from "../Controllers/CategoriesController.js";

const router = express.Router();

// ******** PUBLIC ROUTES ********
router.get("/", categoryController.getCategories);
// ******** ADMIN ROUTES ********
router.post("/", protect, Admin, categoryController.createCategory);
router.put("/:id", protect, Admin, categoryController.updateCategory);
router.delete("/:id", protect, Admin, categoryController.deleteCategory);

export default router;
