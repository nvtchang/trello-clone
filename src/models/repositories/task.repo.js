'use strict'

const { task, issueTask, featureTask, enhancementTask } = require("../task.model")

const findAllArchivedTasks = async ({query, limit, skip}) => {
    return await task.find(query)
        .populate('taskBoard', 'title description -_id')
        .sort({updateAt: - 1})
        .skip(skip)
        .limit(limit)
        .lean()
}

const archivedTask = async ({filter, update}) => {
    return await task.findOneAndUpdate(filter, update)
}

module.exports = {
    findAllArchivedTasks,
    archivedTask
}
