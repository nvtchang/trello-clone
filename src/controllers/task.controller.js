'use strict'
const TaskService = require("../services/task.service")
const { SuccessResponse } = require("../../core/success.response")

class TaskController {
    createTask = async(req, res, next) => {
        new SuccessResponse({
            message: 'Created new Task success',
            metadata: await TaskService.createTask(req.body.type, req.body)
        }).send(res)
    }
}

module.exports = new TaskController()
