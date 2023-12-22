const Notificationmodel = require("../model/Notification");
const User = require("../model/User");

const GetuserNotification=async(req,res)=>{
    const userid=req.params.id
    try{

       const result=await User.findById({_id:userid})
       .populate({
        path:"notifications",
        populate:[{path:"comment"},{path:"author_blog"},{path:"userinfo"}],
        options:{
            sort:{updateAt:-1}
        }
       })
       console.log(result)

       res.status(200).json({
        message: "there is notification",
        data:result
      });
    }catch(e){
        console.error(e);
        res.status(500).json({
            message: "internel server error",
          });
    }
}


module.exports={GetuserNotification}