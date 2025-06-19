'use strict'

const express = require('express')
const taskController = require('../../controllers/task.controller')
const { asyncHandler } = require('../../helper/asyncHandler')
const router = express.Router()
const { authentication } = require('../../auth/authUtils')

//create Task
router.post('/tasks/create'. asyncHandler(taskController.createTask()))

module.exports = router;
