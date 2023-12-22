
const express=require('express')
const { NewBlog, UpdateBlog, GetBlog, GetparticularBlogs, DeleteBlog, UpdateLikes, Getauthorblog, EditAuthorblog } = require('../controllers/BlogUser')
const auth = require('../middleware/auth')
const Router= express.Router()

Router.route("/blogpost").post( NewBlog)
Router.route("/updateBlogs/:id").put( auth, UpdateBlog)
Router.route("/getblogs").get( GetBlog)

Router.route("/getparticularblogs/:id").get( GetparticularBlogs)

Router.route("/deleteblog/:id").delete(DeleteBlog)

Router.route("/updateLikes/:id").put( UpdateLikes)

Router.route('/GetAuthorblog/:id').get(Getauthorblog)
Router.route('/AuthorEditblogs/:id').put(EditAuthorblog)


module.exports= Router