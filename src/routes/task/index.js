'use strict'

const express = require('express')
const taskController = require('../../controllers/task.controller')
const { asyncHandler } = require('../../helper/asyncHandler')
const router = express.Router()
const { authentication } = require('../../auth/authUtils')
const { checkRole, isBoardMember } = require('../../auth/checkAuth')

router.use(authentication)
router.use(isBoardMember)

router.get('/search/:keySearch', asyncHandler(taskController.searchTask))
router.get('', asyncHandler(taskController.findAllTasks))
router.get('/:taskId', asyncHandler(taskController.findTask))

//create Task
router.post('/create', asyncHandler(taskController.createTask))

//update Task
router.patch('/:id', asyncHandler(taskController.updateTask))

//archive and unarchive
router.post('/:id/archive', checkRole('admin'), asyncHandler(taskController.archiveTask))
router.post('/:id/unarchive', asyncHandler(taskController.archiveTask))

//QUERY
router.get('/archives/:taskBoard', asyncHandler(taskController.getAllArchivedTasks))

module.exports = router;
