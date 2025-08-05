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

    static updateBoard = async({ boardId, body }) => {
        const updatedDocument = await board.findByIdAndUpdate(
            { _id: boardId },
            { $set: body},
            { new: true }
        )
        return updatedDocument
    }
}

module.exports = BoardService
