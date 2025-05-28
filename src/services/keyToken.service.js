'use strict'

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({userId, publicKey, privateKey}) => {
        try {
            const tokens = await keytokenModel.create({
                user: userId,
                publicKey,
                privateKey
            })

            return tokens ? tokens.publicKey : null

        } catch (error) {
            console.log("Error when get KeyToken", error);
        }
    }
}

module.exports = KeyTokenService;