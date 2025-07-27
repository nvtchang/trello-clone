'use strict'
const BoardService = require("../services/board.service")
const { SuccessResponse } = require("../../core/success.response")
const slugify = require('slugify')

class BoardController {
    createBoard = async(req, res, next) => {
        new SuccessResponse({
            message: 'Created new Board success',
            metadata: await BoardService.createBoard(req.body)
        }).send(res)
    }
    
    getBoard = async(req, res, next) => {
        const boardId = req.param.boardId;
        
        new SuccessResponse({
            metadata: await BoardService.createBoard(req.body)
        }).send(res)
    }
    
    deleteBoard = async(req, res, next) => {
        console.log("here")        
        new SuccessResponse({
            metadata: await BoardService.createBoard(req.body)
        }).send(res)
    }
    
}

module.exports = new BoardController()
