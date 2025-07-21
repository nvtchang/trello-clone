const express = require('express')
const boardController = require('../../controllers/board.controller')
const { asyncHandler } = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')

const router = express.Router()

router.use(authentication)

//create Task
router.post('/create', asyncHandler(boardController.createBoard))

//query

module.exports = router;
