'use strict'

const express = require('express')
const taskController = require('../../controllers/task.controller')
const { asyncHandler } = require('../../helper/asyncHandler')
const router = express.Router()
const { authentication } = require('../../auth/authUtils')

router.use(authentication)

//create Task
router.post('/create', asyncHandler(taskController.createTask))

//archive Task
router.patch('/archive/:id', asyncHandler(taskController.archiveTask))

//QUERY
router.get('/archives', asyncHandler(taskController.getAllArchivedTasks))

module.exports = router;
