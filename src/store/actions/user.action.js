import { SET_USER_INFO, SET_DATE, SEARCH_USER, DEFAULT_CATEGORY, SET_EDIT_DATA, SET_SUBMIT, SET_MY_PROJECT, SET_TASK_DETAIL, SET_RENDER_DETAIL, SET_PROJECT_MEMLIST, SET_TASK_MODAL } from "../types/user.type";
const setUserInfoAction = (data) => {
    return {
        type: SET_USER_INFO,
        payload: data,
    }
};
const setDate = (date) => {
    return {
        type: SET_DATE,
        payload: date,
    }
};

const userSearch = (list) => {
    return {
        type: SEARCH_USER,
        payload: list,
    }
};
const setCategory = (clist) => {
    return {
        type: DEFAULT_CATEGORY,
        payload: clist,
    }
};

const setEditDataProject = (data) => {
    return {
        type: SET_EDIT_DATA,
        payload: data,
    }
};

const setEditSubmit = (data) => {
    return {
        type: SET_SUBMIT,
        payload: data,
    }
};

const setMyProject = (data) => {
    return {
        type: SET_MY_PROJECT,
        payload: data,
    }
};
const setTaskDetail = (data) => {
    return {
        type: SET_TASK_DETAIL,
        payload: data,
    }
};
const setReRenderDetail = (data) => {
    return {
        type: SET_RENDER_DETAIL,
        payload: data,
    }
};
const setProjectMemList = (data) => {
    return {
        type: SET_PROJECT_MEMLIST,
        payload: data,
    }
};
const setTaskModal = (data) => {
    return {
        type: SET_TASK_MODAL,
        payload: data,
    }
};


export { setUserInfoAction, setDate, userSearch, setCategory, setEditDataProject, setEditSubmit, setMyProject, setTaskDetail, setReRenderDetail, setProjectMemList, setTaskModal }