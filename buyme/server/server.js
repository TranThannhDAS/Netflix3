// express server
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./Routers/UserRoute.js";
import moviesRoutes from "./Routers/MoviesRoutes.js";
import categoriesRoutes from "./Routers/CategoriesRoute.js";
import Uploadrouter from "./Controllers/UploadFile.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// connect to database
connectDB();

// main route
app.get("/", (req, res) => {
  res.send("API is running...");
});
// Other routes
app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/upload", Uploadrouter);

// error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost/${PORT}`);
});
