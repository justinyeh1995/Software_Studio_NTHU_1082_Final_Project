const initGradeListState = {
  gradeList: [],
  isLoading: false,
};
export function gradeList(state = initGradeListState, action) {
  switch (action.type) {
    case "@gradeList/SetGradeList":
      return {
        ...state,
        gradeList: action.gradeList,
      };
    case "@gradeList/StartLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "@gradeList/EndLoading":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
