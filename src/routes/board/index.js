const express = require('express')
const boardController = require('../../controllers/board.controller')
const { asyncHandler } = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const { checkRole } = require('../../auth/checkAuth')


const router = express.Router()

router.use(authentication)

//create Task
router.post('/create', asyncHandler(boardController.createBoard))

//delete Board
router.delete('/delete', checkRole('admin'), asyncHandler(boardController.createBoard))


//query

module.exports = router;
