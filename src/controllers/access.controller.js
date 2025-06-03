'use strict'
const AccessService = require("../services/access.service")
const { CREATED, SuccessResponse } = require("../../core/success.response")
class AccessController {
    signUp = async(req, res, next) => {
        new CREATED({
            message: 'Registered Success',
            metadata:  await AccessService.signUp(req.body)
        }).send(res)
    }
    
    login = async(req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body)
        }).send(res)
    }
    
    logout = async(req, res, next) => {
        await AccessService.logout(req.keyToken)
        
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        
        new SuccessResponse({
            message: 'Loggout success' 
        }).send(res)     
    }
}

module.exports = new AccessController()
