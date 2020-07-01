import { parseGradeList as getGradeListFromApi } from "../api/parser";

function setGradeList(gradeList) {
  return {
    type: "@gradeList/SetGradeList",
    gradeList,
  };
}

function endGradeListLoading() {
  return {
    type: "@gradeList/EndLoading",
  };
}

function startGradeListLoading() {
  return {
    type: "@gradeList/StartLoading",
  };
}

export function getGradeList(courseID) {
  return (dispatch, getState) => {
    if (!getState().gradeList.isLoading) {
      dispatch(startGradeListLoading());
      getGradeListFromApi(courseID)
        .then((gradeList) => {
          dispatch(setGradeList(gradeList));
        })
        .catch((err) => console.error(err))
        .then(() => {
          dispatch(endGradeListLoading());
        });
    } else return;
  };
}
