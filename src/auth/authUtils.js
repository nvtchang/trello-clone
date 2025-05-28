'use strict'
const jwt = require('jsonwebtoken')

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

module.exports = {
    createTokenPair
}