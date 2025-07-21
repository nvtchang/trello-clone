'use strict'

const _ = require('lodash')

const getInfoData = ({fields = [], object = {}}) => {
    return _.pick(object, fields) //lodash will pick field of the object
}

const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(x => [x, 1]))
}
module.exports = {
    getInfoData,
    getSelectData
}
