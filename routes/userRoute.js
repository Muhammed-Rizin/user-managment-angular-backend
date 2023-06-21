const express = require('express')
const userRoute = express()
const userController = require('../controller/userController')
const multer = require('multer')
// const upload = multer({dest : './file'})
const path = require('path')
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname, '../file'))
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/webp" 
        
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg .webp format allowed!"));
      }
    },
  });

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