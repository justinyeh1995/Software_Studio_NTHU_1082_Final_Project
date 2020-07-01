import {
  parseMaterialList as getMaterialListFromApi,
  parseMaterialItem as getMaterialDetailFromApi,
} from "../api/parser";

function setMaterialList(materialList) {
  return {
    type: "@materialList/SetMaterialList",
    materialList,
  };
}

function endMaterialListLoading() {
  return {
    type: "@materialList/EndLoading",
  };
}

function startMaterialListLoading() {
  return {
    type: "@materialList/StartLoading",
  };
}

export function getMaterialList(courseID) {
  return (dispatch, getState) => {
    if (!getState().materialList.isLoading) {
      dispatch(startMaterialListLoading());
      getMaterialListFromApi(courseID)
        .then((materialList) => {
          dispatch(setMaterialList(materialList));
        })
        .catch((err) => console.error(err))
        .then(() => {
          dispatch(endMaterialListLoading());
        });
    } else return;
  };
}

function setMaterialDetail(materialDetail) {
  return {
    type: "@materialDetail/SetMaterialDetail",
    materialDetail,
  };
}

function startMaterialDetailLoading() {
  return {
    type: "@materialDetail/StartLoading",
  };
}

function endMaterialDetailLoading() {
  return {
    type: "@materialDetail/EndLoading",
  };
}

export function getMaterialDetail(courseID, materialID) {
  return (dispatch, getState) => {
    if (!getState().materialDetail.isLoading) {
      dispatch(startMaterialDetailLoading());
      getMaterialDetailFromApi(courseID, materialID)
        .then((materialDetail) => {
          dispatch(setMaterialDetail(materialDetail));
        })
        .catch((err) => console.error(err))
        .then(() => {
          dispatch(endMaterialDetailLoading());
        });
    } else return;
  };
}
