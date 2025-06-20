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

    handleRefreshToken = async(req, res, next) => {
        const result = await AccessService.handleRefreshToken({
            refreshToken: req.cookies?.refreshToken,
            user: req.user,
            keyStore: req.keyStore
        });

        // Set new refresh token cookie
        res.cookie('refreshToken', result.tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        return new SuccessResponse({
            message: 'Token refreshed successfully',
            metadata: {
                accessToken: result.tokens.accessToken,
                user: result.user
            }
        }).send(res);
    }
}

module.exports = new AccessController()
