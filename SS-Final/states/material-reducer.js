const initMaterialListState = {
  materialList: [],
  isLoading: false,
};
export function materialList(state = initMaterialListState, action) {
  switch (action.type) {
    case "@materialList/SetMaterialList":
      return {
        ...state,
        materialList: action.materialList,
      };
    case "@materialList/StartLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "@materialList/EndLoading":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

const initMaterialDetailState = {
  materialDetail: [],
  isLoading: false,
};

export function materialDetail(state = initMaterialDetailState, action) {
  switch (action.type) {
    case "@materialDetail/SetMaterialDetail":
      return {
        ...state,
        materialDetail: action.materialDetail,
      };
    case "@materialDetail/StartLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "@materialDetail/EndLoading":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
