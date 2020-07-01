import {
  parseHomeworkList as getHomeworkListFromApi,
  parseHomeworkItem as getHomeworkDetailFromApi,
} from "../api/parser";

function setHomeworkList(homeworkList) {
  return {
    type: "@homeworkList/SetHomeworkList",
    homeworkList,
  };
}

function endHomeworkListLoading() {
  return {
    type: "@homeworkList/EndLoading",
  };
}

function startHomeworkListLoading() {
  return {
    type: "@homeworkList/StartLoading",
  };
}

export function getHomeworkList(courseID) {
  return (dispatch, getState) => {
    if (!getState().homeworkList.isLoading) {
      dispatch(startHomeworkListLoading());
      getHomeworkListFromApi(courseID)
        .then((homeworkList) => {
          dispatch(setHomeworkList(homeworkList));
        })
        .catch((err) => console.error(err))
        .then(() => {
          dispatch(endHomeworkListLoading());
        });
    } else return;
  };
}

function setHomeworkDetail(homeworkDetail) {
  return {
    type: "@homeworkDetail/SetHomeworkDetail",
    homeworkDetail,
  };
}

function startHomeworkDetailLoading() {
  return {
    type: "@homeworkDetail/StartLoading",
  };
}

function endHomeworkDetailLoading() {
  return {
    type: "@homeworkDetail/EndLoading",
  };
}

export function getHomeworkDetail(courseID, homeworkID) {
  return (dispatch, getState) => {
    if (!getState().homeworkDetail.isLoading) {
      dispatch(startHomeworkDetailLoading());
      getHomeworkDetailFromApi(courseID, homeworkID)
        .then((homeworkDetail) => {
          dispatch(setHomeworkDetail(homeworkDetail));
        })
        .catch((err) => console.error(err))
        .then(() => {
          dispatch(endHomeworkDetailLoading());
        });
    } else return;
  };
}
