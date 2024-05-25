import express from "express";
import authGuard from "../../middleware/authGuard";
import requestValidation from "../../middleware/requestValidation";
import { UserController } from "./user.controller";
import { userValidationSchema } from "./user.validation";

const router = express.Router();

// create user route
router
  .route("/register")
  .post(
    requestValidation(userValidationSchema.createUserValidationSchema),
    UserController.createUser
  );

// login user route
router
  .route("/login")
  .post(
    requestValidation(userValidationSchema.loginUserValidationSchema),
    UserController.loginUser
  );

// get user profile route
router
  .route("/profile")
  .get(authGuard(), UserController.getUserProfile)
  .put(
    authGuard(),
    requestValidation(userValidationSchema.updateUserProfileValidationSchema),
    UserController.updateUserProfile
  );

export const userRoutes = router;
