'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../helper/asyncHandler')
const router = express.Router()
const { authentication, verifyRefreshToken } = require('../../auth/authUtils')

//public router
router.post('/users/signup', asyncHandler(accessController.signUp))
router.post('/users/login', asyncHandler(accessController.login))

router.post('/users/refresh-token', verifyRefreshToken, asyncHandler(accessController.handleRefreshToken))

//private, need go through authentication
//authentication
router.use(authentication)

//logout
router.post('/users/logout', asyncHandler(accessController.logout))

module.exports = router;
