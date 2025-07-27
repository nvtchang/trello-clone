'use strict'
const TaskService = require("../services/task.service")
const { SuccessResponse } = require("../../core/success.response")
const { BadRequestError } = require("../../core/error.response")
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

    /**
     * @description Get all archived tasks for a specific task board
     * @param {String} taskBoard - The ID of the task board
     * @param {Number} limit 
     * @param {Number} skip 
     * @return { JSON } 
     */
    getAllArchivedTasks = async(req, res, next) => {
        const { taskBoard, limit, skip } = req.query;
        if(!taskBoard) {
            throw new BadRequestError('Task board is required');
        }
        new SuccessResponse({
            message: 'Get all archived tasks success',
            metadata: await TaskService.findAllArchivedTasks({ taskBoard, limit, skip })
        }).send(res)
    }
    
    updateTask = async(req, res, next) => {
        const taskId = req.params.id;
        const body = req.body;
        if (!taskId) {
            throw new BadRequestError('Task ID is required');
        }
        new SuccessResponse({
            message: 'Archived Task success',
            metadata: await TaskService.updateTask({taskId, body})
        }).send(res)
    }
    
    archiveTask = async(req, res, next) => {
        const taskId = req.params.id;
        const isArchived = req.path.includes('unarchive') ? false : true;
        console.log("isArchived", isArchived)
        if (!taskId) {
            throw new BadRequestError('Task ID is required');
        }
        new SuccessResponse({
            message: 'Archived Task success',
            metadata: await TaskService.archiveTask({taskId, isArchived})
        }).send(res)
    }
    
    searchTask = async(req, res, next) => {
        const keySearch = req.params.keySearch;

        if (!keySearch) {
            throw new BadRequestError('keySearch is required');
        }
        new SuccessResponse({
            metadata: await TaskService.searchTasks({keySearch})
        }).send(res)
    }
    
    findAllTasks = async(req, res, next) => {
        new SuccessResponse({
            metadata: await TaskService.findAllTasks(req.query)
        }).send(res)
    }
    
    findTask = async(req, res, next) => {
        new SuccessResponse({
            metadata: await TaskService.findTask({
                taskId: req.params.taskId
            })
        }).send(res)
    }
}

module.exports = new TaskController()
