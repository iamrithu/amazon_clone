 const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trin: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate:{
        validator:(value)=>{
            const re =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return value.match(re)
        },
        message:"Please enter a valid email address",
    }
  },
  password: {
    type: String,
    default: "",
  },
  address:{
    type:String,
    default:''
  },
  type:{
    type:String,
    default:"user"
  }
});

const User =mongoose.model("User",userSchema);

module.exports = User;

