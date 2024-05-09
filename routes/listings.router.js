const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedIn,
  isOwner,
  validateListing,
} = require("../middlewares/middlewares.js");
const {
  index,
  renderNewForm,
  renderSingleListing,
  createNewListing,
  renderEditForm,
  updateListing,
  deleteListing,
} = require("../controllers/listing.controller.js");
const multer = require("multer");
const { storage } = require("../config/cloudConfig.js");

const upload = multer({ storage: storage });

router
  .route("/")
  .get(wrapAsync(index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(createNewListing)
  );

router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(renderSingleListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    wrapAsync(updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

// render edit form Page
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

module.exports = router;
