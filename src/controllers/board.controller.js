'use strict'
const BoardService = require("../services/board.service")
const { SuccessResponse } = require("../../core/success.response")
const slugify = require('slugify')

class BoardController {
    createBoard = async(req, res, next) => {
        console.log("req", req)
        new SuccessResponse({
            message: 'Created new Board success',
            metadata: await BoardService.createBoard(req.body)
        }).send(res)
    }
}

module.exports = new BoardController()
