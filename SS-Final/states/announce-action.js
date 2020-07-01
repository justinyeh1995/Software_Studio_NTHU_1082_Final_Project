import {
  parseAnnouncementList as getAnnouncementListFromApi,
  parseAnnouncementItem as getAnnouncementDetailFromApi,
} from "../api/parser";

function setAnnouncementList(announcementList) {
  return {
    type: "@announcementList/SetAnnouncementList",
    announcementList,
  };
}

function endAnnouncementListLoading() {
  return {
    type: "@announcementList/EndLoading",
  };
}

function startAnnouncementListLoading() {
  return {
    type: "@announcementList/StartLoading",
  };
}

export function getAnnouncementList(courseID) {
  return (dispatch, getState) => {
    if (!getState().announcementList.isLoading) {
      dispatch(startAnnouncementListLoading());
      getAnnouncementListFromApi(courseID)
        .then((announcementList) => {
          dispatch(setAnnouncementList(announcementList));
        })
        .catch((err) => console.error(err))
        .then(() => {
          dispatch(endAnnouncementListLoading());
        });
    } else return;
  };
}

function setAnnouncementDetail(announcementDetail) {
  return {
    type: "@announcementDetail/SetAnnouncementDetail",
    announcementDetail,
  };
}

function startAnnouncementDetailLoading() {
  return {
    type: "@announcementDetail/StartLoading",
  };
}

function endAnnouncementDetailLoading() {
  return {
    type: "@announcementDetail/EndLoading",
  };
}

export function getAnnouncementDetail(courseID, newsID) {
  return (dispatch, getState) => {
    if (!getState().announcementDetail.isLoading) {
      dispatch(startAnnouncementDetailLoading());
      getAnnouncementDetailFromApi(courseID, newsID)
        .then((announcementDetail) => {
          dispatch(setAnnouncementDetail(announcementDetail));
        })
        .catch((err) => console.error(err))
        .then(() => {
          dispatch(endAnnouncementDetailLoading());
        });
    } else return;
  };
}
