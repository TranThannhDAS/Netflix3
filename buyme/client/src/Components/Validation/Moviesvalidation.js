import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  rating: yup.number().required("Selet a rating"),
  comment: yup
    .string()
    .required("Please enter a comment")
    .max(150, "Comment should be less than 150 characters"),
});

const MovieValidation = yup.object().shape({
  name: yup
    .string()
    .required("Please enter a movie name")
    .max(50, "Movie name should be less than 50 characters"),
  time: yup.number("Number required").required("Please enter movie duration"),
  language: yup.string().required("Please enter movie language"),
  year: yup
    .number("Number required")
    .required("Please enter year of movie release"),
  desc: yup
    .string()
    .required("Please enter movie description")
    .max(300, "Comment should be less than 300 characters"),
  category: yup.string().required("Please select a category"),
});

export { ReviewValidation, MovieValidation };
