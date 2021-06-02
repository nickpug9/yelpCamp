const express = require("express");

const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utilities/catchAsync");
// const { campgroundSchema, reviewSchema } = require("../schemas.js");
// const ExpressError = require("../utilities/ExpressError");
const Campground = require("../models/campground");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const {
  isLoggedIn,
  validateCampground,
  isAuthor,
} = require("../utilities/middleware");

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(upload.single("image"), (req, res) => {});
// .post(
//   isLoggedIn,
//   validateCampground,
//   catchAsync(campgrounds.createCampground)
// );
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
