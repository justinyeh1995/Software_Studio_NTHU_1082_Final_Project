const initForumListState = {
  forumList: [],
  isLoading: false,
};
export function forumList(state = initForumListState, action) {
  switch (action.type) {
    case "@forumList/SetForumList":
      return {
        ...state,
        forumList: action.forumList,
      };
    case "@forumList/StartLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "@forumList/EndLoading":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

const initForumDetailState = {
  forumDetail: [],
  isLoading: false,
};

export function forumDetail(state = initForumDetailState, action) {
  switch (action.type) {
    case "@forumDetail/SetForumDetail":
      return {
        ...state,
        forumDetail: action.forumDetail,
      };
    case "@forumDetail/StartLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "@forumDetail/EndLoading":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
