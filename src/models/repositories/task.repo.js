'use strict'

const { task, issueTask, featureTask, enhancementTask } = require("../task.model")
const { getSelectData } = require("../../utils/index")

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
    const updatedFields  = keys.reduce((acc, curr) => {
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
    console.log("result", result)
}

module.exports = {
    findAllArchivedTasks,
    findOneUpdatedTask,
    searchTask
}
