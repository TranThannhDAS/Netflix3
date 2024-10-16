import * as yup from "yup";

const LoginValidation = yup.object().shape({
  email: yup.string().email().trim().required("Email is required"),
  password: yup
    .string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
});

const RegisterValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("fullName is required")
    .max(20, "max 20 chars"),
  email: yup.string().email().trim().required("Email is required"),
  password: yup
    .string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
});

const ProfileValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("fullName is required")
    .max(20, "max 20 chars"),
  email: yup.string().email().trim().required("Email is required"),
});

const PasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  newPassword: yup

    .string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  confirmPassword: yup
    .string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export {
  LoginValidation,
  RegisterValidation,
  ProfileValidation,
  PasswordValidation,
};
