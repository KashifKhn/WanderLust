const Listing = require("../models/listing.model");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding-v6");

const geocodingClient = mbxGeocoding({
  accessToken: process.env.MAP_PUBLIC_TOKEN,
});

const index = async (req, res) => {
  const allListing = await Listing.find();
  res.render("listings/index", { allListing });
};

const renderNewForm = (req, res) => {
  res.render("listings/newForm");
};

const renderSingleListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested doesn't Exists");
    res.redirect("/listings");
  }

  let avgRating = 0;
  listing.reviews.forEach((review) => (avgRating += review.rating));
  avgRating = (avgRating / listing.reviews.length).toFixed(1);
  res.render("listings/singleListing", { listing, avgRating });
};

const createNewListing = async (req, res, next) => {
  const resp = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      countries: [req.body.listing.country.slice(0, 3).toLowerCase()],
      limit: 1,
    })
    .send();
  console.log();
  console.log("geometry", resp.body.features[0].geometry);

  const { path: url, filename } = req.file;
  const newListing = new Listing({
    ...req.body.listing,
    owner: req.user._id,
    image: { url, filename },
    geometry: resp.body.features[0].geometry,
  });
  const saveListing = await newListing.save();
  console.log(saveListing);

  req.flash("success", "New listing Created");
  res.redirect("/listings");
};

const renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested doesn't Exists");
    res.redirect("/listings");
  }
  res.render("listings/editForm", { listing });
};

const updateListing = async (req, res) => {
  const { id } = req.params;
  let listing;
  if (req.file) {
    const { path: url, filename } = req.file;
    listing = { ...req.body.listing, image: { url, filename } };
  } else {
    listing = { ...req.body.listing };
  }
  await Listing.findByIdAndUpdate(id, listing);
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

const deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};

module.exports = {
  index,
  renderNewForm,
  renderSingleListing,
  createNewListing,
  renderEditForm,
  updateListing,
  deleteListing,
};
