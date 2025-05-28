'use strict'

const _ = require('lodash')

const getInfoData = ({fields = [], object = {}}) => {
    return _.pick(object, fields) //lodash will pick field of the object
}

module.exports = {
    getInfoData
}