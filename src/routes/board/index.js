const express = require('express')
const boardController = require('../../controllers/board.controller')
const { asyncHandler } = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const { role } = require('../../auth/constant')
const { checkRole, isBoardMember } = require('../../auth/checkAuth')

const router = express.Router()

router.use(authentication)

//create Task
router.post('/create', asyncHandler(boardController.createBoard))

//delete Board
router.delete('/delete', checkRole(role.ADMIN), asyncHandler(boardController.createBoard))

//update board 
router.patch('/:boardId', checkRole(role.ADMIN), asyncHandler(boardController.updateBoard))

//query
router.get('/:boardId', isBoardMember, asyncHandler(boardController.getBoard))

module.exports = router;
