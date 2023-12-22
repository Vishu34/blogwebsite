const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserInfoSchema = new mongoose.Schema(
  {
    
   name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          password: {
            type: String,
            required: true,
           
          },
          confirmpassword: {
            type: String,
            required: true,
          },
          profilepic: {
              type:Array,
            },
            username: {
              type: String,
            },
            userbio: {
              type: String,
            },
   
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
    
    blogs:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"blog" ,//reference to blogmodel
        default:[]
    },
   
        github: {
            type: String,
          },
          facebook: {
            type: String,
          },
          whatsapp: {
            type: String,
          },
          instagram: {
            type: String,
          },
          youtube: {
            type: String,
          },
          twitter: {
            type: String,
          },
          account_info: {
            total_posts: {
              type: Number,
              default: 0
            },
            total_reads: {
              type: Number,
              default: 0
            }
          },
          notifications:{
            type:[mongoose.Schema.Types.ObjectId],
            ref:'notification', //referencing the Notification model
            default:[]
          },
        
    },
    
  {
    timestamps: true,
  }
);

UserInfoSchema.pre("save", async function (next) {
    console.log("password is hai bcypt"+ this.password)
  try {
    // console.log(this.isModified("password"));
    if (this.isNew || this.isModified("password")) {
        console.log(this.password)
      this.password = await bcrypt.hash(this.password, 10);
      console.log(this.password);
    }
    next()
  } catch (e) {
    throw new Error("something went wrong");
  }
});


UserInfoSchema.methods.generateauthtoken = async function () {
  try {
    const token1 = await jwt.sign(
      { _id: this._id },
      "vishusahuiammakingblogwebsitethanksmuch"
    );
    this.tokens = this.tokens.concat({ token: token1 });
    await this.save();
    return token1;
  } catch (e) {
    throw new Error("something went wrong");
  }
};


const User = mongoose.model("Userinfo", UserInfoSchema);

// const Create=async()=>{

//     try{
//         const list= new User({
//             name:"vishu",
//             email:"sahuvishu@gmail.com",
//             password:"1232343",
//             confirmpassword:"1232343",

//          })
//          const list1= new User({
//             name:"vishu",
//             email:"sahuvishu@gmail.com",
//             password:"1232343",
//             confirmpassword:"1232343",

//          })
//          const list2= new User({
//             name:"vishu",
//             email:"sahuvishu@gmail.com",
//             password:"1232343",
//             confirmpassword:"1232343",

//          })

//          const  result = await User.insertMany([list,list1,list2])
//          console.log( await result)
//     }catch(e){
//         console.error(e)
//     }

// }
// Create()

module.exports = User;
