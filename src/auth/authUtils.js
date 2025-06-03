'use strict'
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const { asyncHandler } = require('../helper/asyncHandler');

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = jwt.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        const refreshToken = jwt.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        //debug login 
        jwt.verify(accessToken, publicKey, function(err, decode) {
            if(err) {
                console.error('Error when verify accessToken', err)
            } else {
                console.log('',decode)
            }
        })

        return {accessToken, refreshToken}
    } catch (error) {
        
    }
}

const generateKeys = () => {
    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')
    return {
        "private": privateKey, 
        "public": publicKey 
    };
}

const authentication = asyncHandler(async (req, res, next) => {
    /**
      1- check userId missing???
      2- get accessToken
      3- verify token
      4- check userDB
      5- check keyStore with UserId
      6- OK all => return next()
     */
    console.log("req",req.headers[HEADER.AUTHORIZATION])
    const token = req.headers[HEADER.AUTHORIZATION]
    const decode = jwt.verify(token, '766df2e16a194a77a3b99b7046ca4c2d4857d3476c2a3d01a0a3e3ce8456c2486d73b68c6f37f116de7d8c0d15eab3ed99daee0243f21db1fee01cc58e05239f')

    console.log("decode", decode)
})

module.exports = {
    createTokenPair,
    generateKeys,
    authentication
}
