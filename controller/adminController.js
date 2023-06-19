const Admin = require('../model/adminModel')
const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const postLogin = async ( req, res ) => {
    try {
        const adminData = await Admin.findOne({email : req.body.email})

        if(!adminData){
            return res.status(404).send({
                message : 'Enter Valid Input'
            })
        }

        if(adminData.password !== Number(req.body.password)){
            return res.status(404).send({
                message : 'Enter Valid Input'
            })
        }

        const token = jwt.sign({_id : adminData._id},'secret')
        res.cookie('jwtAdmin',token, {
            httpOnly : true,
            maxAge : 24*60*60*1000
        })

        res.send({
            message : 'Success'
        })
    } catch (error) {
        
    }
}

const getUsers = async ( req, res ) => {
    try {
        const userData = await User.find({})
        res.status(200).json(userData)
    } catch (error) {
        
    }
}


const deleteUser = async ( req,res ) => {
    try {
        const deleted = await User.findByIdAndDelete(req.query.id)
        res.send(
            {message : 'Success'}
        )
    } catch (error) {
        
    }
}

const createUser = async ( req, res ) => {
    try {
        const email = req.body.email
        const name = req.body.name
        const password = req.body.password

        const alreadyMail = await User.findOne({email : email})
        if(alreadyMail) {
            return res.status(400).send({
                message : "Email Already Registered"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const userData = new User ({
            email : email,
            name : name,
            password : hashedPassword
        })
        
        await userData.save()
        res.send({
            message : "Success"
        })
    } catch (error) {
        
    }
}

const userDetails = async (req,res) => {
   try {
    const userId = req.query.id
    const userData = await User.findById(userId)
    if(userData) {
        return res.status(200).json(userData)
    }

    res.status(400).send({
        message : 'Cannot load user'
    })
   } catch (error) {
    
   }
}

const editUser = async (req, res ) => {
    try{
        const name = req.body.name
        const email = req.body.email
        const id = req.body.id

        await User.findByIdAndUpdate(id,{name : name, email : email})

        res.send({
            message : 'Success'
        })
    }catch (error) {

    }
}

module.exports ={
    postLogin,
    getUsers,
    deleteUser,
    createUser,
    userDetails,
    editUser
}