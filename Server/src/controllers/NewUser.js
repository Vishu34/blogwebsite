const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BlogUser = require("../model/Blog");
const Notificationmodel = require("../model/Notification");

const Newuser = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
console.log(name, email, password, confirmpassword)
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(403).json({ message: "user is already exist" });
    } else if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be at least 8 characters or long" });
    } else if (!name || !email || !password || !confirmpassword) {
      return res.status(400).json({
        message: " All field is required",
      });
    }

    if (password === confirmpassword) {
      const user = await new User({
       
            name,
            email,
            password,
            confirmpassword
          
       
      });

      const result = await user.save();
      console.log(result
        )

      return res.status(201).json({
        data: result,
        message: "register  is successfully",
      });
    } else {
      return res.status(200).json({ message: "password are not matching " });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const Userlogin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    const token = await user.generateauthtoken();

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.status(201).json({
        token: token,
        data: user,
        message: "login successfully",
      });
      console.log("login successfully");
    } else {
      return res.status(403).json({
        message: "invalid login",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const Getuser = async (req, res) => {
  const userid=req.rootuserId
  try {



    
    
   
    const result = await User.findById({
   _id:userid   }).populate({
    path:"blogs",
    options:{
      sort:{updatedAt:-1}
    }
   })

   res.status(201).json({
    message: " user data have got successfully",
    data: result,
  });
  
  
  

 

  
   
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Internal server error",
    });
    
  }
};




const GetAuthor = async (req, res) => {
  const authorId=req.params.id
  try {
    const result = await User.findById({
   _id:authorId   }).populate({
    path:"blogs",
    options:{
      sort:{updatedAt:-1}
    }
   })

   
    
   
 

  
    res.status(201).json({
      message: " user data have got successfully",
      data: result,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Internal server error",
    });
    
  }
};

const UpdateUser = async (req, res) => {


  try {
 
    

    const result = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(202).json({
      message: "profile is updated successfully",
      data: result,
    });
  } catch (e) {
    console.error(e);
    
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = { Newuser, Userlogin, Getuser,GetAuthor, UpdateUser };
