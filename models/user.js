const mongoose=require("mongoose");
const{Schema}=mongoose;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
});

userSchema.plugin(passportLocalMongoose);
//plugin function automattically implements username and userpassword with salting and hashing

module.exports=mongoose.model("User",userSchema);