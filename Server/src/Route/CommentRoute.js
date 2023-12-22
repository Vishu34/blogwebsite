
const express=require("express")


const { NewComment, GetComment, NewReply } = require("../controllers/CommentUser")

const Router=express.Router()

Router.route("/newcomment").post(NewComment)
Router.route("/getcomment/:id").get(GetComment)
Router.route("/newreplycomment").post(NewReply)

module.exports=Router