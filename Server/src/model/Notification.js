const mongoose=require("mongoose")

const NewNotificationSchema=new mongoose.Schema({
type:{
type:String,
enum:["likes","comments", "replies"],
required:true
},
author_blog:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"blog",
    required:true
},
userinfo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Userinfo",
    required:true
},
comment:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"comments"
},
reply_on_comment:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"comments"
},


},
{
    timestamps:true
})

const Notificationmodel=new mongoose.model("notification",NewNotificationSchema)

module.exports=Notificationmodel