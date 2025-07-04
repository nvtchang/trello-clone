'use strict'

const express = require('express')
const taskController = require('../../controllers/task.controller')
const { asyncHandler } = require('../../helper/asyncHandler')
const router = express.Router()
const { authentication } = require('../../auth/authUtils')

//need token to process task
// router.use(authentication)

//create Task
router.post('/create', asyncHandler(taskController.createTask))

module.exports = router;
