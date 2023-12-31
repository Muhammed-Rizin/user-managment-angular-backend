const mongoose = require('mongoose')

const userShema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    image : {
        type : String
    }
})

module.exports = mongoose.model('User',userShema)