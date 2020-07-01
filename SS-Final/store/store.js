import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { home } from "../states/home-reducer";
import {
  announcementList,
  announcementDetail,
} from "../states/announce-reducer";

import { materialList, materialDetail } from "../states/material-reducer";
import { homeworkList, homeworkDetail } from "../states/homework-reducer";
import { gradeList } from "../states/grade-reducer";
import { forumList, forumDetail } from "../states/forum-reducer";

const appReducer = {
  home,
  announcementList,
  announcementDetail,
  materialList,
  materialDetail,
  homeworkList,
  homeworkDetail,
  gradeList,
  forumList,
  forumDetail,
};

export const store = createStore(
  combineReducers(appReducer),
  compose(applyMiddleware(thunkMiddleware))
);
