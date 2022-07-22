const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth =  require("../middleware/auth")

const authRouter = express.Router();

//SIGN UP
authRouter.route("/api/signup").post(async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User with same email address exist!" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    let user = new User({
      name,
      email,
      password: hashedPassword,
    });

    user = await user.save();

    res.status(200).json(user);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//SIGN IN

authRouter.route("/api/signin").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User with the email does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const token = jwt.sign({id:user._id},"secreteKey");


    res.json({token,...user._doc});


  } catch (e) {
    res.status(500).json({ error: e.message });   
  }
})

//JWT VALIDATION

authRouter.route("/tokenIsValid").post(async(req,res)=>{
  try {

    const token = req.header("x-auth-token");

    if(!token)return res.json(false); 

    const verified = jwt.verify(token ,"secreteKey");

    if(!verified) return res.json(false);

    const user = await User.findById(verified.id);

    if(!user) return res.json(false);

    res.json(true);
    
  } catch (e) {
    res.status(500).json({ error: e.message });    
  }
})

//GET USER:

authRouter.route("/").get( auth ,async(req,res)=>{

    const user = await User.findById(req.user); 

    res.json({...user._doc,token:req.token});
}); 

module.exports = authRouter;
