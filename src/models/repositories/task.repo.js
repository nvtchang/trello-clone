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
    const { _id } =  await task.findOneAndUpdate(filter, update)
    return _id ? { _id } : null
}

const searchTask = async ({keySearch}) => {
    const regexSearch  = new RegExp(keySearch);
    const result = await task.find({
        $text: {
            $search: regexSearch
        }
    }).lean();
}

module.exports = {
    findAllArchivedTasks,
    archivedTask,
    searchTask
}
