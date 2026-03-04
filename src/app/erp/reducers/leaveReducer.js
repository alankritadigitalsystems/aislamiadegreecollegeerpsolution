const initialState = {
  allLeaves: [],
  allUnapprovedLeaves: [],
  noLeavesFound: false,
  noLeavesForApprovalFound: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case "GET_ALL_UNAPPROVED_LEAVES":
      newState = { ...state, ...payload };
      break;
    case "GET_ALL_APPLIED_LEAVES":
      newState = { ...state, ...payload };
      break;
    case "UNAPPROVED_LEAVES_LOADING":
      newState = { ...state, isLoadingUnapprovedLeaves: payload };
      break;
    case "NO_UNAPPROVED_LEAVES_FOUND":
      newState = { ...state, noLeavesForApprovalFound: payload };
      break;
    case "APPLIED_LEAVES_LOADING":
      newState = { ...state, isLoadingAppliedLeaves: payload };
      break;
    case "NO_LEAVES_FOUND":
      newState = { ...state, noLeavesFound: payload };
      break;
    case "UPDATE_UNAPPROVED_LEAVE":
      newState = { ...state, allUnapprovedLeaves: payload };
      break;
    case "UPDATE_APPLIED_LEAVE":
      newState = { ...state, allAppliedLeaves: payload };
      break;
    case "APPLY_LEAVE":
      newState = { ...state, applyingLeave: payload };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};
