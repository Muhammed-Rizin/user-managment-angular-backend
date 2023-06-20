const Express = require('express')
const adminRoute = Express()
const adminController = require('../controller/adminController')

adminRoute.post( '/login', adminController.postLogin )
adminRoute.get( '/users', adminController.getUsers )
adminRoute.get( '/deleteuser', adminController.deleteUser )
adminRoute.post( '/createuser', adminController.createUser )
adminRoute.get( '/editDetails', adminController.userDetails )
adminRoute.post( '/edituser', adminController.editUser )
adminRoute.get( '/admin', adminController.getAdmin)
adminRoute.get( '/logout', adminController.logOut)

module.exports = adminRoute