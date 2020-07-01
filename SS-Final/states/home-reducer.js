const initHomeState = {
  courseList: [],
  isLoading: false,
  isLogin: false,
  isWrong: false,
};

export function home(state = initHomeState, action) {
  switch (action.type) {
    case "@home/SetIsWrongOn": {
      return {
        ...state,
        isWrong: true,
      };
    }
    case "@home/SetIsWrongOff": {
      return {
        ...state,
        isWrong: false,
      };
    }

    case "@home/SetIsLogin": {
      return {
        ...state,
        isLogin: true,
      };
    }
    case "@home/Logout": {
      return {
        ...state,
        isLogin: false,
      };
    }
    case "@home/SetCourseList":
      return {
        ...state,
        courseList: action.courseList,
      };
    case "home/StartLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "home/EndLoading": {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
