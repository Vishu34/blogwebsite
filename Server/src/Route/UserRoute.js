
const express=require('express')
const {Newuser, Userlogin, Getuser, UpdateUser, GetAuthor} = require('../controllers/NewUser')
const auth = require('../middleware/auth')
const Router= express.Router()

Router.route("/signup").post(Newuser)
Router.route("/signin").post(Userlogin)
Router.route("/getuser").get(auth , Getuser)
Router.route("/getauthor/:id").get(GetAuthor)
Router.route("/edit-profile/:id").put(UpdateUser)


module.exports=Router