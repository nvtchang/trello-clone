'use strict'
const AccessService = require("../services/access.service")
const { CREATED, SuccessResponse } = require("../../core/success.response")
class AccessController {
    signUp = async(req, res, next) => {
        const result =  await AccessService.signUp(req.body)
        new CREATED({
            message: 'Registered Success',
            metadata: result.metadata
        }).send(res)
    }
    
    login = async(req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body)
        }).send(res)
    }
    
    logout = async(req, res, next) => {
        
    }
}

module.exports = new AccessController()
