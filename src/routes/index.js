'use strict'

const express = require('express')
const { apiKey, permission } = require('../auth/checkAuth')
const router = express.Router()

//check apiKey
router.use(apiKey)
//check permission
router.use(permission('000'))

router.use('/v1/api/tasks', require('./task'))
router.use('/v1/api/boards', require('./board'))
router.use('/v1/api', require('./access'))

// router.get('/', (req, res, next) => {
//     return res.status(200).json({
//         message: 'WELCOME',
//     })
// })


module.exports = router;
