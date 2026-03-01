import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosInstance";

const resetReducers = ["RESET_DASHBOARD_STATE", "RESET_STATE"];

const leaveTypes = {
  cl: "Casual Leaves",
  lwp: "Leaves Without Pay",
  pl: "Privileged Leaves",
  ptl: "Paternity Leaves",
  sl: "Sick Leaves",
  el: "Earned Leaves",
  mtl: "Maternity Leaves",
  chcl: "Child Care Leaves",
  ccl: "Comprehensive Casual Leaves",
  dl: "Duty Leaves",
};

// ✅ Unified login handler for Faculty & Student
const userLogin = async (
  payload = {},
  dispatch,
  navigateTo,
  failureCallback,
  userType = "faculty"
) => {
  try {
    dispatch({ type: "LOADING", payload: true });
    const endpoint =
      userType === "student" ? "/student/login" : "/faculty/login";

    const res = await axiosInstance.post(endpoint, payload, {
      withCredentials: true,
    });

    dispatch({ type: "LOADING", payload: false });

    const { data } = res || {};

    if (!data?.success) {
      toast.error(data?.message || "Login failed.", {
        position: "top-right",
        autoClose: 3000,
      });
      failureCallback?.();
      return;
    }

    // ✅ Student login flow
    if (userType === "student") {
      toast.success("Student login successful!", { autoClose: 2000 });
      dispatch({
        type: "SET_LOGIN_INFO",
        payload: { student: data.student },
      });
      navigateTo?.();
      return;
    }

    // ✅ Faculty login flow
    const response = formatLeaves(data);
    dispatch({
      type: "SET_LOGIN_INFO",
      payload: { email_id: payload.email_id, ...response },
    });

    if (payload.password === "password") {
      dispatch({
        type: "SET_DEFAULT_PASSWORD",
        payload: { isDefaultPassword: true },
      });
    } else {
      navigateTo?.();
    }
  } catch (error) {
    console.error("Login error:", error);
    dispatch({ type: "LOADING", payload: false });
    failureCallback?.();

    const message =
      error?.response?.data?.message || "Server error. Please try again later.";
    toast.error(message, { position: "top-right", autoClose: 3000 });
  }
};

// ✅ Format faculty leaves
const formatLeaves = (data = {}) => {
  const res = { ...data };
  const { userProfile: { leave: leaves = {} } = {} } = res;
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
    delete res.userProfile.leave;
    res.userProfile.leavesList = leavesList;
  }
  return res;
};

// ✅ Logout + Session helpers
const userLogout = (dispatch) => {
  dispatch({ type: "USER_LOGOUT" });
};

const clearSession = (dispatch) => {
  resetReducers.forEach((a) => dispatch({ type: a }));
  dispatch({ type: "USER_LOGOUT" });
};

// ✅ Fetch faculty profile
const fetchUserProfile = (id) => async (dispatch) => {
  try {
    const result = await axiosInstance.get(`/faculty/FacultyByID?_id=${id}`);
    const { data } = result || {};
    if (Object.keys(data).length) {
      const formatData = { userProfile: { ...data } };
      const response = formatLeaves(formatData);
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { newProfile: response.userProfile },
      });
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
  }
};

export { userLogin, userLogout, clearSession, fetchUserProfile };
