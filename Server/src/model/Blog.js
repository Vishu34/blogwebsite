

const mongoose = require("mongoose")

const NewblogSchema=new mongoose.Schema({
    blogimage:{
        type:Array
    },
    heading:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    shortdescription:{
        type:String
    },
    tags:{
type:Array
    },
    authors:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Userinfo" ,//reference to usermodel
        
    },
    activity:{
        total_likes:{
            type:Number,
            default:0
        },
        total_comments:{
            type:Number,
            default:0
        },
        total_reads:{
            type:Number,
            default:0
        }
    },

    likes:{
        type:Array,
        default:[]
    },
    comment_user:{
        
        type:[mongoose.Schema.Types.ObjectId],
        ref:"comments",
        default:[]
       
    }

},
{
    timestamps:true
})


const BlogUser= new mongoose.model("blog", NewblogSchema)

module.exports = BlogUser