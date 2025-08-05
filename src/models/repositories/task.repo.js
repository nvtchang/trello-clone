'use strict'

const { task, issueTask, featureTask, enhancementTask } = require("../task.model")
const { getSelectData, getUnSelectData } = require("../../utils/index")

const findAllArchivedTasks = async ({query, limit, skip}) => {
    return await task.find(query)
        .populate('taskBoard', 'title description -_id')
        .sort({updateAt: - 1})
        .skip(skip)
        .limit(limit)
        .lean()
}

const findOneUpdatedTask = async ({filter, update}) => {
    const result = await task.findOneAndUpdate(filter, update, {new : true})
    if(!result) return null 
    const keys = Object.keys(update); //['title', 'isArchived']
    const updatedFields = keys.reduce((acc, curr) => { //return only updated fields
        acc[curr] = result[curr] 
        return acc
    }, {})
    return updatedFields
}

const searchTask = async ({keySearch}) => {
    const regexSearch  = new RegExp(keySearch);
    const result = await task.find({
        $text: {
            $search: regexSearch
        }
    }).lean();
    return result
}

const findAllTasks = async ({limit, sort, page, filter, select}) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? {_id: -1} : {_id: 1}
    const tasks = await task.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean()
    return tasks
}

const findTask = async ({taskId, unSelect}) => {
    return await task.findById({
        taskId
    }).select(getUnSelectData(unSelect))
}

module.exports = {
    findAllArchivedTasks,
    findOneUpdatedTask,
    searchTask,
    findAllTasks,
    findTask
}
