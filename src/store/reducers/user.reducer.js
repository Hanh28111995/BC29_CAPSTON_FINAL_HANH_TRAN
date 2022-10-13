import { LoadingContext } from "contexts/loading.context";
import { useContext } from "react";
import { fetchCreateProjectAPI } from "services/project";
import { USER_INFO_KEY } from "../../constants/common";
import { SET_USER_INFO, SET_DATE, SEARCH_USER, DEFAULT_CATEGORY, SET_EDIT_DATA,  SET_SUBMIT, SET_MY_PROJECT } from "../types/user.type";

let userInfor = localStorage.getItem(USER_INFO_KEY);
if (userInfor) {
  userInfor = JSON.parse(userInfor);
}
// const [_, setLoadingState] = useContext(LoadingContext);
const DEFAULT_STATE = {
  userInfor,
  date: '',
  list: [],
  category: [],
  detail: {
    title:'',
    setOpen: false,
    infor: <hr />,
    data: {
      id: 0,
      projectName: "string",
      creator: 0,
      description: "string",
      categoryId: "string"
    },
  },
  task: {
    listUserAsign: [
      0
    ],
    taskName: 'string',
    description: 'string',
    statusId: 'string',
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    projectId: 0,
    typeId: 0,
    priorityId: 0
  },
  callBackSubmit: (propsValue) => { alert('edit demo') },
  myProject: [],
};
export const userReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case SET_USER_INFO: {
      state.userInfor = payload;
      return { ...state };
    }
    case SET_DATE: {
      state.date = payload;
      return { ...state };
    }
    case SEARCH_USER: {
      state.list = payload;
      return { ...state };
    }
    case DEFAULT_CATEGORY: {
      state.category = payload;
      return { ...state };
    }

    case SET_EDIT_DATA: {
      state.detail = payload;
      return { ...state };
    }

    case SET_SUBMIT: {
      state.callBackSubmit = payload;
      return { ...state };
    }
    case SET_MY_PROJECT: {
      state.myProject = payload;
      return { ...state };
    }

    default:
      return state;
  }
};
