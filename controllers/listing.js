const Listing=require("../models/listing");
const axios = require("axios");
const mapToken=process.env.MAP_TOKEN;


module.exports.index=async(req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm=(req,res)=>{
    
    res.render("listings/new.ejs");
}



module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", {listing,mapToken:process.env.MAP_TOKEN
    });
};



module.exports.createListing = async (req, res, next) => {
    try {
        const location = req.body.listing.location;

        const response = await axios.get(`https://api.maptiler.com/geocoding/${location}.json`, {
            params: {
                key: mapToken,
                limit: 1,
            }
        });

        const geometry = response.data?.features?.[0]?.geometry;

        if (!geometry) {
            console.log("No geometry found for location:", location);
            req.flash("error", "Invalid location provided.");
            return res.redirect("/listings/new");
        }

        const url = req.file.path;
        const filename = req.file.filename;
        console.log(url, "..", filename);

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        newListing.geometry = {
            type: geometry.type,
            coordinates: geometry.coordinates
        };

        const savedListing = await newListing.save();
        console.log(savedListing);
        req.flash("success", "New Listing Created");
        res.redirect("/listings");

    } catch (err) {
        console.error("Error creating listing:", err);
        req.flash("error", "Something went wrong while creating the listing.");
        res.redirect("/listings/new");
    }
};




module.exports.renderEditForm=async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you requested for does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs",{listing,originalImageUrl});
}

module.exports.searchListing=async(req,res)=>{
    let{q}=req.query;
    let query={};
    if(q){
        
        query={
            $or:[
                {title:{$regex:q,$options:"i"}},
                {location:{$regex:q,$options:"i"}}
            ]};
    }
    
    const listing=await Listing.find(query)
    try {
    const allListings = await Listing.find(query);
    res.render("listings/index.ejs", { allListings }); // reuse index page to show results
  } catch (err) {
    console.error("Search Error:", err);
    req.flash("error", "Something went wrong during search");
    res.redirect("/listings");
  }
    
    
}

module.exports.updateListing=async(req,res)=>{
    let{id}=req.params;
     
    let listing=await Listing.findByIdAndUpdate(id,{ ...req.body.listing});
    console.log("BODY:", req.body);
console.log("FILE:", req.file);
    
    if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }

    if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
}

// if (req.file) {
//     listing.image = {
//         url: req.file.path,
//         filename: req.file.filename
//     };
//     await listing.save();
//}
    
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing=async(req,res)=>{
    let{id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","New Listing Deleted");
    res.redirect("/listings");
}