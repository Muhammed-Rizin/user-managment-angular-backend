const express = require('express')
const userRoute = express()
const userController = require('../controller/userController')
const multer = require('multer')
const upload = multer({dest : './file'})

// Register
userRoute.post('/register', userController.postRegister)

// Login 
userRoute.post('/login', userController.postlogin)

// User
userRoute.get('/user', userController.getuser)
userRoute.post('/profile-upload-single', upload.single('image'), userController.updateImage)

// LogOut
userRoute.post('/logOut', userController.logOut)

module.exports = userRoute