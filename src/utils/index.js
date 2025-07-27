'use strict'

const _ = require('lodash')

const getInfoData = ({fields = [], object = {}}) => {
    return _.pick(object, fields) //lodash will pick field of the object
}

/**
['a', 'b'] => {a: 1, b: 1}
 */
const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(x => [x, 1]))
}

const getUnSelectData = (select = []) => {
    return Object.fromEntries(select.map(x => [x, 0]))
}

module.exports = {
    getInfoData,
    getSelectData,
    getUnSelectData
}
