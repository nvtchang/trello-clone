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
                return new IssueTask(payload);
            case 'Feature':
                return new FeatureTask(payload);
            case 'Enhancement':
                return new EnhancementTask(payload);
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
    async createTask() {
        return await task.create(this)
    }
}

//define sub-class for different Task
class IssueTask extends Task {
    async createTask() {
        const session = await mongoose.startSession();
        
        try { //use transaction to revert if create task fail 
            const newIssue = await issueTask.create(this).session(session)
            if(!newIssue) throw new BadRequestError("Can not created new Issue")
            
            const newTask = await super.createTask().session(session)
            if(!newTask) throw new BadRequestError("Can not created new Task")
            
        } catch(error) {
            console.error('Transaction aborted:', error.message);
        } finally {
            session.endSession();
        }
    }
}

class FeatureTask extends Task {
    async createTask() {
        const session = await mongoose.startSession();
        
        try { //use transaction to revert if create task fail 
            const newFeature = await featureTask.create(this).session(session)
            if(!newFeature) throw new BadRequestError("Can not created new Feature")
            
            const newTask = await super.createTask().session(session)
            if(!newTask) throw new BadRequestError("Can not created new Task")
            
        } catch(error) {
            console.error('Transaction aborted:', error.message);
        } finally {
            session.endSession();
        }
    }
}

class EnhancementTask extends Task {
    async createTask() {
        const session = await mongoose.startSession();
        
        try { //use transaction to revert if create task fail 
            const newEnhancement = await enhancementTask.create(this).session(session)
            if(!newEnhancement) throw new BadRequestError("Can not created new Enhancement")
            
            const newTask = await super.createTask().session(session)
            if(!newTask) throw new BadRequestError("Can not created new Task")
            
        } catch(error) {
            console.error('Transaction aborted:', error.message);
        } finally {
            session.endSession();
        }
    }
}

module.exports = TaskFactory
