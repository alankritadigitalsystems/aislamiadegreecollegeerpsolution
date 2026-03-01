import { get, post, put } from "../common/Provider";
import { dummySalarySlipJSON } from "./dummySalarySlipData";

const searchUser =
  (idx, callbacks = {}) =>
  async (dispatch) => {
    const { searchErrorCallback, salaryErrorCallback } = callbacks;
    let isSuccess = false;
    const url = `api/v1/faculty/verifyApprover?id=${idx}`;
    dispatch({ type: "SEARCH_USER", payload: { searchingUser: true } });
    const res = await get(url);
    const {
      data: { success, id },
    } = res || {};
    if (success) {
      isSuccess = true;
      if (id) {
        const response = await get(`api/v1/faculty/FacultyByID?_id=${id}`);
        const { data = {} } = response || {};
        if (Object.keys(data).length) {
          dispatch({ type: "SAVE_USER_PROFILE", payload: { data } });
          dispatch(
            getFacultySalaryCustomization(
              { faculty_id: idx },
              salaryErrorCallback
            )
          );
        }
      }
    } else {
      isSuccess = false;
      dispatch({ type: "RESET_USER_PROFILE" });
      searchErrorCallback();
    }
    dispatch({
      type: "SEARCH_USER",
      payload: {
        searchingUser: false,
        verificationSuccess: isSuccess,
        verifyApiCalled: true,
      },
    });
  };

const resetForm = () => (dispatch) => {
  dispatch({
    type: "SEARCH_USER",
    payload: {
      searchingUser: false,
      verificationSuccess: false,
      verifyApiCalled: false,
      userInformation: {},
    },
  });
};
const resetExistingSalaryConfig = () => (dispatch) => {
  dispatch({ type: "RESET_SALARY_CONFIG" });
};

//not used: can be removed
const searchSalarySlip = (data) => async (dispatch) => {
  let isSalarySlip = false;
  const url = "";
  dispatch({
    type: "SEARCH_SALARY_SLIP",
    payload: { searchingSalarySlip: true },
  });
  // const res = await get(url);
  // const {data: {}} = res || {};
  setTimeout(() => {
    isSalarySlip = true;
    dispatch({
      type: "SEARCH_SALARY_SLIP",
      payload: {
        searchingSalarySlip: false,
        isSalarySlip: true,
        salarySlipData: dummySalarySlipJSON,
        selectedMonthandYear: data,
      },
    });
  }, 2000);
};

const getFacultySalaryCustomization = (id, failureCallback) => async (dispatch) => {
    const url = "api/v1/salary/getFacultySalaryCustomization";
    const res = await post(url, id);
    const { data = {} } = res || {};
    if (Object.keys(data).length && !data.error) {
      dispatch({ type: "SAVE_SALARY_CONFIG", payload: { data } });
    } else {
      dispatch({ type: "RESET_SALARY_CONFIG" });
      failureCallback();
    }
  };

const setFacultySalaryCustomization =
  (payload, callback) => async (dispatch) => {
    const url = "api/v1/salary/setFacultySalaryCustomization"; //for one faculty
    const res = await post(url, payload);
    callback(res.data);
  };
// set DA
const setUniMonthlySalary = (payload, callbacks = {}) => async (dispatch) => {
    const { successCallback, failureCallback } = callbacks;
    const url = "api/v1/salary/setUniMonthlySalary";
    const res = await post(url, payload);
    const { data = {} } = res || {};
    if (data.message) {
      dispatch({
        type: "SAVE_DA_PERCENTAGE",
        payload: payload.earnings[0].percentage,
      });
      successCallback();
    } else {
      dispatch({
        type: "SAVE_DA_PERCENTAGE",
        payload: 0,
      });
      failureCallback(data.error);
    }
  };

const calculateSalaryForMonth = (payload, callbacks) => async (dispatch) => {
  const { successCallback, failureCallback } = callbacks;
  const url = "api/v1/salary/calculateSalaryForMonth";
  const res = await post(url, payload);
  const { data = {} } = res || {};
  if (res.status === 201) {
    successCallback(data);
  } else failureCallback();
};

const updateSalaryCustomization = (payload, callbacks) => async (dispatch) => {
  const { successCallback, failureCallback } = callbacks;
  dispatch({
    type: "UPDATE_CONFIGURATION",
    payload: { isUpdatingConfiguration: true },
  });
  const url = "api/v1/salary/updateSalaryCustomization";
  const res = await put(url, payload);
  dispatch({
    type: "UPDATE_CONFIGURATION",
    payload: { isUpdatingConfiguration: false },
  });
  const { data = {} } = res || {};
  if (data.status === "success")
    successCallback(data.updatedSalaryCustomization, payload.category);
  else failureCallback(data);
};
//full configuration for given month and year
const getUniMonthlySalary = (payload, callback) => async (dispatch) => {
  const url = "api/v1/salary/getUniMonthlySalary";
  const res = await post(url, payload);
  callback(res);
};

export {
  searchUser,
  resetForm,
  searchSalarySlip,
  setFacultySalaryCustomization,
  getFacultySalaryCustomization,
  setUniMonthlySalary,
  calculateSalaryForMonth,
  updateSalaryCustomization,
  getUniMonthlySalary,
  resetExistingSalaryConfig,
};
