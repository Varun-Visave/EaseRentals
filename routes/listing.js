const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const ExpressErrors = require("../utils/ExpressErrors.js");
const Listing = require("../models/listing.js");



//validate schema
const validateSchema = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        console.log(error)
        let errMsg = error.detail.map((el)=>el.message).join(',');
        throw new ExpressErrors(404, errMsg);
    }else{
        next();
    }
}


// Index route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// New route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
}); 

// Create Route
router.post("/", wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);   
    await newListing.save();
    res.redirect("/listings");
}));

// Edit route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).send('Listing not found');
    }
    res.render("listings/edit.ejs", { listing });
}));

// Update route
router.put("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    console.log(req.listing)
    await Listing.findByIdAndUpdate(id,{ ...req.body.listing });
    res.redirect("/listings");
}));

// Delete route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;

    // Validate ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).send('Invalid ID format');
    // }

    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

// Show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;


    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
        return res.status(404).send('Listing not found');
    }

    res.render("listings/show.ejs", { listing });
}));

module.exports = router;