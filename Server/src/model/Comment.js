const mongoose=require('mongoose')

const NewCommentSchema= new mongoose.Schema({
    comment:{
        type:String,
       
    },
   
    blog_author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Userinfo",
        required:true
    },
    reply_comment:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"comments",
        
    }
},
{
    timestamps:true
})

const Commentmodel= new mongoose.model("comments", NewCommentSchema)

module.exports=Commentmodel