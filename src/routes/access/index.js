'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../auth/checkAuth')
const router = express.Router()

//signUp
router.post('/users/signup', asyncHandler(accessController.signUp))

module.exports = router;
