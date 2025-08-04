'use strict'

const { findById } = require("../services/apiKey.service");
const { userRole } = require("./constant")
const { findBoardById } = require("../models/repositories/board.repo")
const { NotFoundError, AuthFailureError, ForbiddenError } = require("../../core/error.response")
const _ = require("lodash")

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString(); 
        if(!key) {
            return res.status(403).json({
                message: 'Forbidden'
            })
        }
        
        //check objKey
        const objKey = await findById(key);
        if(!objKey) {     
            throw new AuthFailureError('Key not found')
        }
        req.objKey = objKey; //gắn objKey vào req để gán permisssion
        return next();
        
    } catch (error) {
        
    }
}

const permission = (permission) => {
    return (req, res, next) => { 
        if(!req.objKey.permissions) {
            // return res.status(403).json({
            //     message: 'Permission denied'
            // })   
            throw new ForbiddenError('Permission denied')
        }    
        const validPermission = req.objKey.permissions.includes(permission)
        
        if(!validPermission) {           
            throw new ForbiddenError('Permission denied')
        }       
        return next()
    }
}

const checkRole = (role) => {
    return(req, res, next) => {
        const decodeRole = _.findKey(userRole, value => value === req.role)
        if(decodeRole !== role) {          
            throw new ForbiddenError('Access denied: Insufficient privileges')
        }
        return next()
    }
}

const isBoardMember = async (req, res, next) => {
    const { boardId } = req.params || req.body || req.query   
    const { userId } = req.keyToken
    
    const board = await findBoardById({boardId, select: 'members'})
    if(!board) {
        throw new NotFoundError('Board not found')
    }
    
    const isMember = board.members.some(x => x.toString() === userId)

    if(!isMember) {
        throw new ForbiddenError('You are not a member of this board')
    }
    return next();
}

module.exports = {
    apiKey,
    permission,
    checkRole,
    isBoardMember
}
