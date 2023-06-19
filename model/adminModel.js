const mongoose = require('mongoose')

const adminModel = mongoose.Schema({
    email : {
        type : String,
    },
    password : {
        type : Number
    }
})

module.exports = mongoose.model('admin',adminModel)
