'use strict'
const AccessService = require("../services/access.service")
const { CREATED } = require("../../core/success.response")
class AccessController {
    signUp = async(req, res, next) => {
        const result =  await AccessService.signUp(req.body)
        console.log("result", result)
        new CREATED({
            message: 'Registered Success',
            metadata: result.metadata
        }).send(res)
    }
}

module.exports = new AccessController()
