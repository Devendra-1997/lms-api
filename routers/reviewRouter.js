import express from "express";
import { createBookReviews, updateBookReviews } from "../models/bookModel.js";
import { updateBurrow } from "../models/burrowModel.js";
import {
  createReview,
  getManyReview,
  updateReview,
} from "../models/reviewModel.js";
import {
  buildSuccessResponse,
  buildErrorResponse,
} from "../utility/responseHelper.js";
import { newReviewValidation } from "../middlewares/joiValidations/reviewValidation.js";
import { adminAuth, userAuth } from "../middlewares/auth/authMiddlewares.js";

const reviewRouter = express.Router();

// Public Routes

// GET reviews, optionally filter by book_id
reviewRouter.get("/", userAuth, async (req, res, next) => {
  try {
    const { role } = req.userInfo;
    const { book_id } = req.query;

    const filter = role === "admin" ? {} : { status: "active" };
    if (book_id) filter.book_id = book_id;

    const reviews = await getManyReview(filter).lean();
    reviews?.length
      ? buildSuccessResponse(res, reviews, "Reviews fetched successfully.")
      : buildErrorResponse(res, "No reviews available.");
  } catch (error) {
    next(error);
  }
});
// Private Routes

// CREATE a review
reviewRouter.post("/", userAuth, newReviewValidation, async (req, res) => {
  try {
    const review = await createReview(req.body);

    if (review?._id) {
      // update burrow to to set has_review: true
      const filter = { _id: review.burrow_id };
      const updatedBurrow = {
        has_review: true,
      };

      await updateBurrow(filter, updatedBurrow);
      await createBookReviews(review);
    }

    review?._id
      ? buildSuccessResponse(res, review, "Thank you for the review.")
      : buildErrorResponse(res, "Something went wrong.");
  } catch (error) {
    buildErrorResponse(res, error.message);
  }
});

// UPDATE a review
reviewRouter.patch("/:_id", adminAuth, async (req, res) => {
  try {
    const { _id } = req.params;
    const { status } = req.body;

    const review = await updateReview({ _id }, { status });

    if (review?._id) {
      // update book with review inside reviews array
      const result = await updateBookReviews(review);
    }

    review?._id
      ? buildSuccessResponse(res, review, "Review updated.")
      : buildErrorResponse(res, "Something went wrong.");
  } catch (error) {
    buildErrorResponse(res, error.message);
  }
});

export default reviewRouter;
