const Listing = require("../models/listing.model");
const Review = require("../models/review.model.js");
const ExpressError = require("../utils/ExpressError");
const {
  listingSchemaValidation,
  reviewSchemaValidation,
} = require("../utils/schemaValidation.js");

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchemaValidation.validate(req.bod);
  if (error) throw new ExpressError(400, error);
  next();
};

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchemaValidation.validate(req.body);
  if (error) throw new ExpressError(400, error);
  next();
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must logged in First");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  res.locals.redirectUrl = req.session.redirectUrl;
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "Request Denied  you don't have permissions");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "Request Denied  you don't have permissions");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
