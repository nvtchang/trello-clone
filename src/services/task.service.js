'use strict'

const { task, issueTask, featureTask, enhancementTask } = require("../models/task.model")
const { BadRequestError } = require("../../core/error.response")
const mongoose = require('mongoose');

//define factory class
class TaskFactory {
    /*
     type: 'Issue', 'Feature', 'Enhancement'
     */
    static async createTask(type, payload){
        switch(type){
            case 'Issue':  
                return new IssueTask(payload).createTask();
            case 'Feature':
                return new FeatureTask(payload).createTask();
            case 'Enhancement':
                return new EnhancementTask(payload).createTask();
            default:
                throw new BadRequestError(`Invalid Task type ${type}`)
        }
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
    async createTask(session) {
        return await task.create([this], { session })
    }
}

//define sub-class for different Task
class IssueTask extends Task {
    constructor(task) {
        super(task);
        this.issueDetails = task.details
    }
    async createTask() {
       
        try { //use transaction to revert if create task fail 
            const newIssue = await issueTask.create(this.issueDetails) //session require array as first arg
            if(!newIssue) throw new BadRequestError("Can not created new Issue")
            
            const newTask = await super.createTask()
            if(!newTask) throw new BadRequestError("Can not created new Task")
            
            return newIssue
        } catch(error) {
            console.error('Transaction aborted:', error.message);
        }
    }
}

class FeatureTask extends Task {
    constructor(task) {
        super(task)
        this.featureDetails = task.details
    }
    
    async createTask() {        
        try { //use transaction to revert if create task fail 
            const newFeature = await featureTask.create(this.featureDetails)
            if(!newFeature) throw new BadRequestError("Can not created new Feature")
            
            const newTask = await super.createTask()
            if(!newTask) throw new BadRequestError("Can not created new Task")
            return newFeature

        } catch(error) {
            console.error('Transaction aborted:', error.message);
        } 
    }
}

class EnhancementTask extends Task {
    constructor(task) {
        super(task)
        this.enhancementDetails = task.details
    }
    async createTask() {        
        try { //use transaction to revert if create task fail 
            const newEnhancement = await enhancementTask.create(this)
            if(!newEnhancement) throw new BadRequestError("Can not created new Enhancement")
            
            const newTask = await super.createTask()
            if(!newTask) throw new BadRequestError("Can not created new Task")
            return newEnhancement
        } catch(error) {
            console.error('Transaction aborted:', error.message);
        }
    }
}

module.exports = TaskFactory
