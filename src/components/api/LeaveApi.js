import { get, post } from "../common/Provider";

const leaveTypes = {
  cl: "Casual Leaves",
  lwp: "Leaves Without Pay",
  pl: "Privileged Leaves",
  ptl: "Paternity Leaves",
  sl: "Sick Leaves",
  el: "Earned Leaves",
  mtl: "Maternity Leaves",
  chcl: "Child Care Leaves",
  ccl: "Comprehensan Casual Leaves",
  dl: "Duty Leaves",
};
const getAllUnapprovedLeaves = (userId) => async (dispatch) => {
  dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: true });
  const res = await get(`api/v1/leave/getUnApprovedLeaves?id=${userId}`);
  const { data = [] } = res || {};
  if (data) {
    const allUnapprovedLeaves = data;
    dispatch({
      type: "GET_ALL_UNAPPROVED_LEAVES",
      payload: { allUnapprovedLeaves: allUnapprovedLeaves },
    });
    dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: false });
    dispatch( {type: "NO_UNAPPROVED_LEAVES_FOUND", payload: false} );
  }
  if(data.length < 1) dispatch( {type: "NO_UNAPPROVED_LEAVES_FOUND", payload: true} );
};
const approveLeave = (data) => async (dispatch) => {
  dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: true });
  const requestParam = {
    leave_id: data.leaveId,
    user_id: data.approverId,
  };
  const res = await post("api/v1/leave/approveLeave", requestParam);
  if (res?.data?.message === "Leave Approved") {
    dispatch(
      updateUnapprovedLeave(data.leaveId, data.allUnapprovedLeaves, "approve")
    );
    dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: false });
  } else {
    dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: false });
    alert(res.data.err);
  }
};
const rejectLeave = (data) => async (dispatch) => {
  dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: true });
  const requestParam = {
    leave_id: data.leaveId,
    reason_for_action: data.rejectionRemark,
    user_id: data.approverId,
  };
  const res = await post("api/v1/leave/rejectLeave", requestParam);
  if (res?.data?.message === "Leave Rejected") {
    dispatch(
      updateUnapprovedLeave(data.leaveId, data.allUnapprovedLeaves, "reject")
    );
    dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: false });
  } else {
    dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: false });
    alert(res.data.err);
  }
};
const forwardLeave = (data) => async (dispatch) => {
  dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: true });
  const requestParam = {
    leave_id: data.leaveId,
    user_id: data.approverId,
    next_approver: data.forwardedID,
    // reason: data.forwardReason,
  };
  const res = await post("api/v1/leave/forwardLeave", requestParam);
  if (res?.data?.message === "Leave Forwarded Successfully") {
    dispatch(
      updateUnapprovedLeave(data.leaveId, data.allUnapprovedLeaves, "forward", data.forwardedID)
    );
    dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: false });
  } else {
    dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: false });
    alert(res.data.err);
  }
};
const updateUnapprovedLeave = (leaveId, allUnapprovedLeaves, action, opt = "") => (dispatch) => {
    const tmp = [...allUnapprovedLeaves];
    const targetLeaveIndex = tmp.findIndex((obj) => obj._id === leaveId);
    if (action === "approve") {
      tmp[targetLeaveIndex].isApproved = true;
      tmp[targetLeaveIndex].isRejected = false;
      tmp[targetLeaveIndex].isForwarded = false;
      tmp[targetLeaveIndex].status = "Approved";
    } else if (action === "reject") {
      tmp[targetLeaveIndex].isApproved = false;
      tmp[targetLeaveIndex].isRejected = true;
      tmp[targetLeaveIndex].isForwarded = false;
      tmp[targetLeaveIndex].status = "Rejected";
    } else if (action === "forward") {
      tmp[targetLeaveIndex].isApproved = false;
      tmp[targetLeaveIndex].isRejected = false;
      tmp[targetLeaveIndex].isForwarded = true;
      tmp[targetLeaveIndex].status = "Forwarded";
      tmp[targetLeaveIndex].current_approver = opt;
    } else if (action === "approveWithdrawal") {
      tmp[targetLeaveIndex].isWithdrawalApproved = true;
      tmp[targetLeaveIndex].status = "Withdrawal approved";
    }
    dispatch({
      type: "UPDATE_UNAPPROVED_LEAVE",
      payload: tmp,
    });
  };
const fetchAllLeavesByIdAndDate = (vals) => async (dispatch) => {
  dispatch({ type: "APPLIED_LEAVES_LOADING", payload: true });
  const requestParam = {
    id: vals.faculty_id,
    starting_date: vals.startingDate,
    ending_date: vals.endingDate,
  };
  const res = await post(`api/v1/leave/getLeaveByIDAndDates`, requestParam);
  const { data = [] } = res || {};
  if (data) {
    const allAppliedLeaves = data;
    dispatch({
      type: "GET_ALL_APPLIED_LEAVES",
      payload: { allAppliedLeaves: allAppliedLeaves },
    });
    dispatch({ type: "APPLIED_LEAVES_LOADING", payload: false });
    dispatch( {type: "NO_LEAVES_FOUND", payload: false} );
  }
  if (data.length < 1) dispatch( {type: "NO_LEAVES_FOUND", payload: true} );
};
const withdrawLeave = (data, callback) => async (dispatch) => {
  const requestParam = {
    leave_id: data.leaveId,
    reason_for_action: data.withdrawReason,
    user_id: data.userId
  };
  const res = await post("api/v1/leave/withdrawLeave", requestParam);
  if (res?.data?.message === "Leave Withdrawn") {
    callback();
    dispatch(
      updateLeaveAfterWithdrawn(
        data.leaveId,
        data.allAppliedLeaves,
        "Withdrawn"
      )
    );
  } else {
    res.data.err ? alert(res.data.err) : alert(res.data.error);
  }
};
const approveLeaveWithdrawal = (data, callback) => async (dispatch) => {
  dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: true });
  const requestParam = {
    leave_id: data.leaveId,
    user_id: data.userId
  };
  const res = await post("api/v1/leave/approveLeaveWithdrawal", requestParam);
  if (res?.data?.message === "Leave Withdrawn") {
    callback();
    dispatch(
      updateUnapprovedLeave(
        data.leaveId, 
        data.allUnapprovedLeaves, 
        "approveWithdrawal"
      )
    );
    dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: false });
  } else {
    dispatch({ type: "UNAPPROVED_LEAVES_LOADING", payload: false });
    res.data.err ? alert(res.data.err) : alert(res.data.error);
  }
}
const withdrawApprovedLeave = (data, callback) => async (dispatch) => {
  const requestParam = {
    leave_id: data.leaveId,
    reason_for_action: data.withdrawReason,
    user_id: data.userId
  };
  const res = await post("api/v1/leave/withdrawLeave", requestParam);
  if (res?.data?.message === "Leave Withdrawal Requested") {
    callback();
    dispatch(
      updateLeaveAfterWithdrawn(
        data.leaveId,
        data.allAppliedLeaves,
        "Requested withdrawal"
      )
    );
  } else {
    res.data.err ? alert(res.data.err) : alert(res.data.error);
  }
};
const updateLeaveAfterWithdrawn = (leaveId, allAppliedLeaves, updatedStatus) => (dispatch) => {
    const tmp = [...allAppliedLeaves];
    const targetLeaveIndex = tmp.findIndex((obj) => obj._id === leaveId);
    tmp[targetLeaveIndex].status = updatedStatus;
    dispatch({
      type: "UPDATE_APPLIED_LEAVE",
      payload: tmp,
    });
  };
const createLeave = (payload, callback, errorCallback) => async (dispatch) => {
  const id = payload._id;
  delete payload._id;
  dispatch({ type: "APPLY_LEAVE", payload: true });
  const res = await post("api/v1/leave/createLeave", payload);
  dispatch({ type: "APPLY_LEAVE", payload: false });
  if (res?.data?.message === "leave created") {
    const result = await get(`api/v1/faculty/FacultyByID?_id=${id}`);
    const { data = {} } = result || {};
    if (Object.keys(data).length) {
      const response = formatLeaves(data);
      dispatch({ type: "UPDATE_PROFILE", payload: { newProfile: response } });
    }
    callback();
  } else if (res?.data?.error) {
    errorCallback(res.data.error);
  }
};
const formatLeaves = (data = {}) => {
  const res = { ...data };
  const { leave: leaves = {} } = res;
  const leavesList = [];
  if (Object.keys(leaves).length) {
    Object.keys(leaves).forEach((key) => {
      leavesList.push({
        leaveCode: key,
        leaveType: leaveTypes[key] || "na",
        infiniteLeaves: ["ccl", "dl"].includes(key),
        ...leaves[key],
      });
    });
    delete res.leave;
    res.leavesList = leavesList;
    return res;
  }
  return res;
};

export {
  getAllUnapprovedLeaves,
  approveLeave,
  rejectLeave,
  forwardLeave,
  createLeave,
  fetchAllLeavesByIdAndDate,
  withdrawLeave,
  withdrawApprovedLeave,
  approveLeaveWithdrawal
};
