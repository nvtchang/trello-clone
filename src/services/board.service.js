'use strict'
const board = require("../models/board.model")
class BoardService {
    static createBoard = async(payload) => {
        return await board.create(payload)
    }
}

module.exports = BoardService
