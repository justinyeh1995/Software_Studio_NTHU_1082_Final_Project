import {
  parseForumList as getForumListFromApi,
  parseForumItem as getForumDetailFromApi,
} from "../api/parser";
import { Platform } from "react-native";

function setForumList(forumList) {
  return {
    type: "@forumList/SetForumList",
    forumList,
  };
}

function endForumListLoading() {
  return {
    type: "@forumList/EndLoading",
  };
}

function startForumListLoading() {
  return {
    type: "@forumList/StartLoading",
  };
}

export function getForumList(courseID) {
  return (dispatch, getState) => {
    if (!getState().forumList.isLoading) {
      dispatch(startForumListLoading());
      getForumListFromApi(courseID)
        .then((forumList) => {
          dispatch(setForumList(forumList));
        })
        .catch((err) => console.error(err))
        .then(() => {
          dispatch(endForumListLoading());
        });
    } else return;
  };
}

function setForumDetail(forumDetail) {
  return {
    type: "@forumDetail/SetForumDetail",
    forumDetail,
  };
}

function startForumDetailLoading() {
  return {
    type: "@forumDetail/StartLoading",
  };
}

function endForumDetailLoading() {
  return {
    type: "@forumDetail/EndLoading",
  };
}

export function getForumDetail(courseID, forumID) {
  return (dispatch, getState) => {
    if (!getState().forumDetail.isLoading) {
      dispatch(startForumDetailLoading());
      getForumDetailFromApi(courseID, forumID)
        .then((forumDetail) => {
          dispatch(setForumDetail(forumDetail));
        })
        .catch((err) => console.error(err))
        .then(() => {
          dispatch(endForumDetailLoading());
        });
    } else return;
  };
}
