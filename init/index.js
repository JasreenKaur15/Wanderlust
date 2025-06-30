const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");



main().then(()=>{
    console.log("Connected to Db");
}).catch(err=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"68564a6646c64d8c2f85ad8c"}));
    //map function will go to individual object and add the property of owner and it does not make changes to existing array but create new array and add the properties
    //...obj->it means that all the properties of existing object will come
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};
initDB();
