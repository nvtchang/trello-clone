'use strict'

const { findById } = require("../services/apiKey.service");

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
             return res.status(403).json({
                message: 'Key not find'
            })
        }
        req.objKey = objKey; //gắn objKey vào req để gán permisssion
        return next();
        
    } catch (error) {
        
    }
}

const permission = (permission) => {
    return (req, res, next) => { //closure có thể sử dụng hàm của các hàm cha
        if(!req.objKey.permissions) {
            return res.status(403).json({
                message: 'Permission denied'
            })   
        }
        
        const validPermission = req.objKey.permissions.includes(permission)
        
        if(!validPermission) {
            return res.status(403).json({
                message: 'Permission denied'
            })   
        }
        
        return next()
    }
}


module.exports = {
    apiKey,
    permission
}
