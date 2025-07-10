'use strict'

const { task, issueTask, featureTask, enhancementTask } = require("../models/task.model")
const { BadRequestError } = require("../../core/error.response")
const mongoose = require('mongoose');
const { findAllDraftTasks } = require("../models/repositories/task.repo")
//define factory class
class TaskFactory {
    /*
     type: 'Issue', 'Feature', 'Enhancement'
     */

    static taskRegistry = {} //key-class

    static registerTaskType(type, classRef) {
        TaskFactory.taskRegistry[type] = classRef;
    }
    
    static async createTask(type, payload){
        const taskClass = TaskFactory.taskRegistry[type];
        if(!taskClass) {
            throw new BadRequestError(`Task type ${type} is not registered`);  
        }
        return new taskClass(payload).createTask();
        // switch(type){
        //     case 'Issue':  
        //         return new IssueTask(payload).createTask();
        //     case 'Feature':
        //         return new FeatureTask(payload).createTask();
        //     case 'Enhancement':
        //         return new EnhancementTask(payload).createTask();
        //     default:
        //         throw new BadRequestError(`Invalid Task type ${type}`)
        // }
    }
    
    static async findAllDraftsForBoard({taskBoard, limit = 50, skip = 0}) {
        const query = { taskBoard, isDraft: true}
        return await findAllDraftTasks({query, limit, skip})
    }
}

//define base task class
class Task {
    constructor({
        title, description, column, taskBoard, assignees, dueDate, order, labels, attachments, type, priority, status
    }){
        this.title = title
        this.description = description
        this.column = column
        this.taskBoard = taskBoard
        this.assignees = assignees
        this.dueDate = dueDate
        this.order = order
        this.labels = labels
        this.attachments = attachments
        this.priority = priority
        this.status = status
    }
    //create new Task
    async createTask({_id}) {
        const payload = {
            ...this,
            _id: _id ? new mongoose.Types.ObjectId(_id) : new mongoose.Types.ObjectId(), //use _id from issueDetails or create new one
        }
        console.log('Creating task with details:', payload);
        return await task.create(payload) //session require array as first arg
    }
}

//define sub-class for different Task
class IssueTask extends Task {
    constructor(task) {
        super(task);
        this.issueDetails = task.details
    }
    async createTask() { 
        try { 
            const newIssue = await issueTask.create(this.issueDetails) 
            if(!newIssue) throw new BadRequestError("Can not created new Issue")
            
            const newTask = await super.createTask({
                _id: newIssue._id, //use _id from issueDetails
            })
            if(!newTask) throw new BadRequestError("Can not created new Task")
            
            return {
                task: newTask,
                issue: newIssue
            };
        } catch(error) {
            console.error('Insert aborted:', error.message);
        }
    }
}

class FeatureTask extends Task {
    constructor(task) {
        super(task)
        this.featureDetails = task.details
    }
    
    async createTask() {        
        try { 
            const newFeature = await featureTask.create(this.featureDetails) 
            if(!newFeature) throw new BadRequestError("Can not created new Feature")
            
            const newTask = await super.createTask({
                _id: newFeature._id,
            })
            if(!newTask) throw new BadRequestError("Can not created new Task")
            
            return {
                task: newTask,
                feature: newFeature
            };

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
        try { 
            const newEnhancement = await enhancementTask.create(this.enhancementDetails) 
            if(!newEnhancement) throw new BadRequestError("Can not created new Enhancement")
            
            const newTask = await super.createTask({
                _id: newEnhancement._id, 
            })
            if(!newTask) throw new BadRequestError("Can not created new Task")
            
            return {
                task: newTask,
                enhancement: newEnhancement
            };
        } catch(error) {
            console.error('Transaction aborted:', error.message);
        }
    }
}

//register task types
TaskFactory.registerTaskType('Issue', IssueTask);
TaskFactory.registerTaskType('Feature', FeatureTask);   
TaskFactory.registerTaskType('Enhancement', EnhancementTask);

module.exports = TaskFactory
