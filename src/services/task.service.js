'use strict'

const { task, issueTask, featureTask, enhancementTask } = require("../models/task.model")

//define factory class
class TaskFactory {
    static async createTask(){

    }
}


//define base task class
class Task {
    constructor({
        title, description, column, board, assignees, dueDate, order, labels, attachments, type, priority, status
    }){
        this.title = title
        this.description = description
        this.column = column
        this.board = board
        this.assignees = assignees
        this.dueDate = dueDate
        this.order = order
        this.labels = labels
        this.attachments = attachments
        this.priority = priority
        this.status = status
    }

    //create new Task
    async createTask() {
        return await task.create(this)
    }
}