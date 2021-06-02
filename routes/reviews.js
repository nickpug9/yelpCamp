const express = require("express");
const router = express.Router({ mergeParams: true });
// id param is only defined in index.js so need to merge

const {
  isLoggedIn,
  validateReview,
  isReviewAuthor,
} = require("../utilities/middleware");
const ExpressError = require("../utilities/ExpressError");
const catchAsync = require("../utilities/catchAsync");

const Campground = require("../models/campground");
const Review = require("../models/review");
const reviews = require("../controllers/reviews");

const { reviewSchema } = require("../schemas.js");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);
module.exports = router;
