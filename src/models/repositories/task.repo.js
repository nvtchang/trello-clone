'use strict'

const { task, issueTask, featureTask, enhancementTask } = require("../task.model")

const findAllDraftTasks = async ({query, limit, skip}) => {
    return await task.find(query)
    .populate('taskBoard', 'title description -_id')
    .sort({updateAt: - 1})
    .skip(skip)
    .limit(limit)
    .lean()
}

module.exports = {
    findAllDraftTasks
}
