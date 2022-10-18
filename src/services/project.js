import { request } from "../configs/axios";

const fetchProjectListAPI = () => {
    return request({
        url: '/Project/getAllProject',
        method: 'GET',
    })
};

const fetchProjectPriorityAPI = () => {
    return request({
        url: '/Priority/getAll',
        method: 'GET',
    })
};

const fetchProjectTaskTypeAPI = () => {
    return request({
        url: '/TaskType/getAll',
        method: 'GET',
    })
};

const fetchProjectStatusIdAPI = () => {
    return request({
        url: '/Status/getAll',
        method: 'GET',
    })
};

const fetchCreateTaskAPI = (data) => {
    return request({
        url: '/Project/createTask',
        method: 'POST',
        data,
    })
}

const fetchGetUserAPI = (keyword) => {
    return request({
        url: `/Users/getUser?keyword=${keyword}`,
        method: 'GET',
    })
};

const fetchProjectCategoryAPI = () => {
    return request({
        url: '/ProjectCategory',
        method: 'GET',
    })
}
const fetchProjectDetailAPI = (projectID) => {
    return request({
        url: `/Project/getProjectDetail?id=${projectID}`,
        method: 'GET',
    })
}
const fetchUpdateProjectDetailAPI = (projectID, data) => {
    return request({
        url: `/Project/updateProject?projectId=${projectID}`,
        method: 'PUT',
        data,
    })
}
const fetchCreateProjectAPI = (data) => {
    return request({
        url: '/Project/createProjectAuthorize',
        method: 'POST',
        data,
    })
}

const fetchDeleteProjectAPI = (idProject) => {
    return request({
        url: `/Project/deleteProject?projectId=${idProject}`,
        method: 'DELETE',
    })
}

const fetchAddUserAPI = (data) => {
    return request({
        url: '/Project/assignUserProject',
        method: 'POST',
        data,
    })
}

const fetchRemoveUserFromProjectAPI = (data) => {
    return request({
        url: '/Project/removeUserFromProject',
        method: 'POST',
        data,
    })
}


const fetchMembersListAPI = (projectID) => {
    return request({
        url: `/Users/getUserByProjectId?idProject=${projectID}`,
        method: 'GET',
    })
};

const fetchGetTaskDetailAPI = (taskID) => {
    return request({
        url: `Project/getTaskDetail?taskId=${taskID}`,
        method: 'GET',
    })
};


const fetchUpdateStatusAPI = (data) => {
    return request({
        url: '/Project/updateStatus',
        method: 'PUT',
        data,
    })
}

const fetchUpdateDescriptionAPI = (data) => {
    return request({
        url: '/Project/updateDescription',
        method: 'PUT',
        data,
    })
}

const fetchUpdateTimeTrackingAPI = (data) => {
    return request({
        url: '/Project/updateTimeTracking',
        method: 'PUT',
        data,
    })
}

const fetchUpdateAllOfTaskAPI = (data) => {
    return request({
        url: '/Project/updateTask',
        method: 'POST',
        data,
    })
}
const fetchDeleteTaskAPI = (taskID) => {
    return request({
        url: `/Project/removeTask?taskId=${taskID}`,
        method: 'DELETE',
    })
}

export {fetchDeleteTaskAPI ,fetchUpdateAllOfTaskAPI, fetchUpdateStatusAPI, fetchUpdateTimeTrackingAPI, fetchUpdateDescriptionAPI, fetchProjectListAPI, fetchMembersListAPI, fetchGetUserAPI, fetchAddUserAPI, fetchProjectCategoryAPI, fetchCreateProjectAPI, fetchDeleteProjectAPI, fetchRemoveUserFromProjectAPI, fetchProjectDetailAPI, fetchUpdateProjectDetailAPI, fetchProjectPriorityAPI, fetchProjectTaskTypeAPI, fetchProjectStatusIdAPI, fetchCreateTaskAPI, fetchGetTaskDetailAPI, }