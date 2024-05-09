const express = require("express");

const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedIn,
  validateReview,
  isAuthor,
} = require("../middlewares/middlewares.js");
const {
  createReview,
  deleteReview,
} = require("../controllers/review.controller.js");

const router = express.Router({
  mergeParams: true,
});

// create review
router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));

// delete review
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(deleteReview));

module.exports = router;
