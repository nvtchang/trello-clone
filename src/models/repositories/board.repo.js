'use strict'
const board = require("../board.model")

const findBoardById = async ({boardId, select = false}) => {
    let query = board.findOne({_id: boardId})
    if(select) {
        query = query.select(select)
    } 
    return await query
}

module.exports = {
    findBoardById
}
