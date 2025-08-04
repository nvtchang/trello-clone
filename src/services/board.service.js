'use strict'
const board = require("../models/board.model")
const { findBoardById } = require("../models/repositories/board.repo")
class BoardService {
    static createBoard = async(payload) => {
        return await board.create(payload)
    }
    
    static getBoard = async(boardId) => {
        return await findBoardById({ boardId })
    }
}

module.exports = BoardService
