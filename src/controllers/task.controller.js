'use strict'
const TaskService = require("../services/task.service")
const { SuccessResponse } = require("../../core/success.response")

class TaskController {
    createTask = async(req, res, next) => {
        new SuccessResponse({
            message: 'Created new Task success',
            metadata: await TaskService.createTask(req.body.type, {
                ...req.body,
                userId: req.user //get userId from token
            })
        }).send(res)
    }

    archiveTask = async(req, res, next) => {
        const taskId = req.params.id;
        const body = req.body;
        if (!taskId) {
            throw new BadRequestError('Task ID is required');
        }
        new SuccessResponse({
            message: 'Archived Task success',
            metadata: await TaskService.archiveTask({taskId, body})
        }).send(res)
    }
}

module.exports = new TaskController()
