'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../helper/asyncHandler')
const router = express.Router()
const { authentication } = require('../../auth/authUtils')
//signUp
router.post('/users/signup', asyncHandler(accessController.signUp))
router.post('/users/login', asyncHandler(accessController.login))

//authentication
router.use(authentication)


//logout
router.post('/users/logout', asyncHandler(accessController.logout))


module.exports = router;
