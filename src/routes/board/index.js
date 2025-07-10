const express = require('express')
const boardController = require('../../controllers/board.controller')
const { asyncHandler } = require('../../helper/asyncHandler')
const router = express.Router()

//create Task
router.post('/create', asyncHandler(boardController.createBoard))

//query
// router.get('/drafts', asyncHandler(boardController.getAllDraftsForBoard))

module.exports = router;
