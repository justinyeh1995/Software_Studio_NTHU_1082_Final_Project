import { parseCourseList as getCourseListFromApi } from "../api/parser";
import { login as loginFromApi } from "../api/login";
import { AsyncStorage } from "react-native";
import { post } from "../api/fetch";

function setCourseList(courseList) {
  return {
    type: "@home/SetCourseList",
    courseList,
  };
}

function startCourseListLoading() {
  return {
    type: "@home/StartLoading",
  };
}

function endCourseListLoading() {
  return {
    type: "@home/EndLoading",
  };
}

function SetIsLogin() {
  return {
    type: "@home/SetIsLogin",
  };
}

export function SetIsWrongOff() {
  return {
    type: "@home/SetIsWrongOff",
  };
}

function SetIsWrongOn() {
  return {
    type: "@home/SetIsWrongOn",
  };
}

function SetLogout(params) {
  return {
    type: "@home/Logout",
  };
}

export function Logout() {
  return (dispatch, getState) => {
    return AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() => post("https://lms.nthu.edu.tw/sys/lib/ajax/logout.php"))
      .then(() => {
        dispatch(SetLogout());
      })
      .catch((err) => console.log(err));
  };
}

export function login(account, password) {
  return (dispatch, getState) => {
    return loginFromApi(account, password)
      .then(() => {
        dispatch(startCourseListLoading());
        getCourseListFromApi()
          .then((courseList) => {
            // console.log(courseList);
            if (!courseList.length) throw new Error("No Course");
            dispatch(SetIsLogin());
            dispatch(setCourseList(courseList));
            AsyncStorage.setItem("user", JSON.stringify({ account, password }));
          })
          .catch((err) => {
            console.log(err);
            dispatch(SetIsWrongOn());
          })
          .then(() => dispatch(endCourseListLoading()));
      })
      .catch((err) => console.log(err));
  };
}

// export function getCourseList() {
//   return (dispatch, getState) => {
//     if (!getState().home.isLoading) {
//       dispatch(startCourseListLoading());
//       getCourseListFromApi()
//         .then((courseList) => {
//           dispatch(setCourseList(courseList));
//           AsyncStorage.setItem("courseList", JSON.stringify(courseList));
//         })
//         .catch((err) => console.error(err))
//         .then(() => dispatch(endCourseListLoading()));
//     }
//   };
// }
