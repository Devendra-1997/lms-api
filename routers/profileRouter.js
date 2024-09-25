import express from "express";
import { updateUserProfileById } from "../models/userModel.js"; // Example user model function
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";
import { userAuth } from "../middlewares/auth/authMiddlewares.js"; // User authentication middleware
import { updateUserProfileValidation } from "../middlewares/joiValidations/userValidation.js"; // Validation middleware

const profileRouter = express.Router();

// UPDATE user profile
profileRouter.patch(
  "/",
  userAuth,
  updateUserProfileValidation,
  async (req, res) => {
    try {
      const userId = req.userInfo._id; // Assuming userInfo is populated after authentication
      const updatedUser = await updateUserProfileById(userId, req.body);

      updatedUser?._id
        ? buildSuccessResponse(res, updatedUser, "Profile updated successfully")
        : buildErrorResponse(res, "Unable to update profile");
    } catch (error) {
      buildErrorResponse(res, error.message);
    }
  }
);

export default profileRouter;
