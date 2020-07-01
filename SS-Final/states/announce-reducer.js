import { exp } from "react-native-reanimated";

const initAnnouncementListState = {
  announcementList: [],
  isLoading: false,
};
export function announcementList(state = initAnnouncementListState, action) {
  switch (action.type) {
    case "@announcementList/SetAnnouncementList":
      return {
        ...state,
        announcementList: action.announcementList,
      };
    case "@announcementList/StartLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "@announcementList/EndLoading":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

const initAnnouncementDetailState = {
  announcementDetail: [],
  isLoading: false,
};

export function announcementDetail(
  state = initAnnouncementDetailState,
  action
) {
  switch (action.type) {
    case "@announcementDetail/SetAnnouncementDetail":
      return {
        ...state,
        announcementDetail: action.announcementDetail,
      };
    case "@announcementDetail/StartLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "@announcementDetail/EndLoading":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
