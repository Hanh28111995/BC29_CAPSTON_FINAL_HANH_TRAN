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
export { fetchProjectListAPI, fetchMembersListAPI, fetchGetUserAPI, fetchAddUserAPI, fetchProjectCategoryAPI, fetchCreateProjectAPI, fetchDeleteProjectAPI, fetchRemoveUserFromProjectAPI, fetchProjectDetailAPI, fetchUpdateProjectDetailAPI, fetchProjectPriorityAPI, fetchProjectTaskTypeAPI, fetchProjectStatusIdAPI, fetchCreateTaskAPI };