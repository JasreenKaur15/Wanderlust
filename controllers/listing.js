const Listing=require("../models/listing");


module.exports.index=async(req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm=(req,res)=>{
    
    res.render("listings/new.ejs");
}

module.exports.showListing=async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"author"
        },
    }).populate("owner");//populate method is used to show the whole data not only the id
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
}
module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,"..",filename);
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
}

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
    
    if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    
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