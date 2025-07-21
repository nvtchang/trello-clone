'use strict'

const express = require('express')
const taskController = require('../../controllers/task.controller')
const { asyncHandler } = require('../../helper/asyncHandler')
const router = express.Router()
const { authentication } = require('../../auth/authUtils')

router.get('/search:keySearch', asyncHandler(taskController.searchTask))

router.use(authentication)

//create Task
router.post('/create', asyncHandler(taskController.createTask))

//update Task
router.patch('/:id', asyncHandler(taskController.updateTask))

//archive and unarchive
router.post('/:id/archive', asyncHandler(taskController.archiveTask))
router.post('/:id/unarchive', asyncHandler(taskController.archiveTask))

//QUERY
router.get('/archives/:taskBoard', asyncHandler(taskController.getAllArchivedTasks))

module.exports = router;
