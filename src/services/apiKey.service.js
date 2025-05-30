'use strict'

const apiKeyModel = require('../models/apikey.model')
const crypto = require('crypto')

const findById = async (key) => {
    const objKey = await apiKeyModel.findOne({key, status: true}).lean();
    return objKey
}

const generateApiKey = () => {
    return crypto.randomBytes(32).toString('hex');
}

const saveApiKeyToUser = async (key, permission, userId) => {
    return await apiKeyModel.create({
        key: key,
        permissions: permission,
        userId: userId
    })
}

module.exports = {
    findById,
    generateApiKey,
    saveApiKeyToUser
}
