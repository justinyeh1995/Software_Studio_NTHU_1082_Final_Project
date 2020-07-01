const initHomeworkListState = {
  homeworkList: [],
  isLoading: false,
};
export function homeworkList(state = initHomeworkListState, action) {
  switch (action.type) {
    case "@homeworkList/SetHomeworkList":
      return {
        ...state,
        homeworkList: action.homeworkList,
      };
    case "@homeworkList/StartLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "@homeworkList/EndLoading":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

const initHomeworkDetailState = {
  homeworkDetail: [],
  isLoading: false,
};

export function homeworkDetail(state = initHomeworkDetailState, action) {
  switch (action.type) {
    case "@homeworkDetail/SetHomeworkDetail":
      return {
        ...state,
        homeworkDetail: action.homeworkDetail,
      };
    case "@homeworkDetail/StartLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "@homeworkDetail/EndLoading":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
