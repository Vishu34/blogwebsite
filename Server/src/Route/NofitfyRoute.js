
const express=require('express')
const { GetuserNotification } = require('../controllers/Notificationuser')
const Router=express.Router()

Router.route("/getusernotification/:id").get(GetuserNotification)

module.exports=Router