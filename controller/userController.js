const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// Register 
const postRegister = async (req,res) => {
    try {
        const name = req.body.name 
        const email = req.body.email 
        const password = req.body.password 
        
        const alreadyMail = await User.findOne({email : email})
        if(alreadyMail) {
            return res.status(400).send({
                message : "Email Already Registered"
            })
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = new User({
            name : name,
            email : email,
            password : hashedPassword
        })

        const result = await userData.save()
        const {_id } = await result.toJSON()

        const token = jwt.sign({_id : _id},"secret")

        res.cookie("jwt",token, {
            httpOnly : true,
            maxAge : 24*60*60*1000
        })

        res.send({
            message : "Success"
        })
    } catch (error) {
        
    }
}

const postlogin = async (req,res) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if(!user){
            return res.status(404).send({
                message : 'User not Found'
            })
        }

        if(!(await bcrypt.compare(req.body.password, user.password))){
            return res.status(400).send({
                message : 'Password is Incorrect'
            })
        }

        const token = jwt.sign({_id : user._id},'secret')
        res.cookie('jwt',token, {
            httpOnly : true,
            maxAge : 24*60*60*1000
        })

        res.send({
            message : 'Success'
        })
    } catch (error) {
        
    }
}

// user
const getuser = async (req,res) => {
    try {
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'secret')

        if(!claims){
            return res.status(401).send({
                message : "unauthenticated"
            })
        }

        const user = await User.findOne({_id : claims._id})
        const {password, ...data } = await user.toJSON()

        res.send(data)

    } catch (error) {
        return res.status(401).send({
            message : "unauthenticated"
        })
    }
}

const updateImage = async (req, res) => {
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, 'secret')
    if(!claims) {
        return res.status(401).send({
            message : 'unauthenticated'
        })
    }

    const updateImage = await User.updateOne({_id : claims._id}, {$set : {image : req.file.filename}})
    console.log(updateImage);
    if(updateImage){
        res.status(200).json({
            message : 'image uploaded successfully'
        })
    }else {
        res.status(401).json({
            message : 'Something went wrong'
        })
    }
}

const logOut = (req,res) => {
    try{
        res.cookie('jwt','',{maxAge : 0})
        res.send({
            message : 'Success'
        })
    }catch(error){
        
    }
}

module.exports = {
    postRegister,
    postlogin,
    getuser,
    logOut,
    updateImage
}