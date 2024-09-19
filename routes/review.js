const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressErrors = require("../utils/ExpressErrors.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Reviews = require("../models/review.js");
const Listing = require("../models/listing.js");

//validae review
// const validateReview = (req, res, next)=>{
//     let {error} = reviewSchema.validate(req.body);
//     if(error){
//         console.log(error)
//         let errMsg = error.detail.map((el)=>el.message).join(',');
//         throw new ExpressErrors(404, errMsg);
//     }else{
//         next();
//     }
// }

//Reviews
// POST review route
// router.post("/", wrapAsync(async(req, res)=>{ //listings/:id/reviews common path
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Reviews(req.body.review);
//     listing.reviews.push(newReview);   
//     await newReview.save(); 
//     await listing.save();   
    
//     res.redirect(`/listings/${listing._id}`);

// }));

// //Delete review Route
// router.delete("/:reviewId", wrapAsync(async (req, res)=>{
//     let { id , reviewId } = req.params;
//     await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
//     await Reviews.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/{$id}`);
// }));

// module.exports = router;