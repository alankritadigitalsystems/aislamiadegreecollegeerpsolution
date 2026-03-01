import React, { Fragment, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import Popup from "../../Shared/Popup";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  getUniMonthlySalary,
  setFacultySalaryCustomization,
  updateSalaryCustomization,
} from "../../api/salaryApi";

const CreateSalaryForm = (props = {}) => {
  const {
    isEdit = false,
    isCreate = false,
    verifyAndSearchUser,
    verificationSuccess,
    searchingUser,
    userInformation = {},
    currentUser,
    setActiveTab,
    // existingDA,
    existingSalaryConfig = {},
    editorId = "",
    history,
    isUpdating,
    permissions = {},
    activeTab,
  } = props;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { salaryReducer = {} } = state;
  const { existingDAPercentage } = salaryReducer;
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const [openEventPopup, setopenEventPopup] = useState(false);
  const [customPopupTitle, setcustomPopupTitle] = useState("");
  const [customPopupContent, setcustomPopupContent] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [salaryConfigExists, setSalaryConfigExists] = useState(false);
  const [keepDASame, setKeepDASame] = useState(false);
  const [updateArr, setUpdateArr] = useState({});
  const [fetchedDA, setDA] = useState(0);

  useEffect(() => {
    if (activeTab == 1 && isCreate) {
      fetchDA();
    }
  }, [activeTab, isCreate]);

  const fetchDA = () => {
    setDA(0);
    const requestParam = {
      month: months[new Date().getMonth()],
      year: new Date().getFullYear(),
    };
    dispatch(getUniMonthlySalary(requestParam, getUniMonthlySalaryCallback));
  };

  const getUniMonthlySalaryCallback = (resp) => {
    if (
      existingDAPercentage > 0 ||
      resp?.data?.earnings?.filter((val) => val.category === "DA")?.length === 1
    ) {
      formik.setFieldValue(
        "earnings[1].percentage",
        resp.data.earnings[0].percentage
          ? resp.data.earnings[0].percentage
          : existingDAPercentage
      );
      setDA(resp.data.earnings[0].percentage);
      toast.success("DA percentage fetched for current month.");
    } else {
      dispatch({
        type: "SAVE_DA_PERCENTAGE",
        payload: 0,
      });
      formik.setFieldValue("earnings[1].percentage", "");
      setDA(0);
      toast.error("No DA percentage specified for current month.");
      setActiveTab(2);
    }
  };

  const initialValues = {
    faculty_id: "",
    created_by: currentUser,
    last_edited_by: currentUser,
    earnings: [
      {
        category: "basic",
        isPercentage: false,
        amount: "0",
      },
      {
        category: "DA",
        isPercentage: true,
        percentage: existingDAPercentage,
      },
      {
        category: "HRA",
        isPercentage: true,
        percentage: "0",
      },
      {
        category: "CA",
        isPercentage: true,
        percentage: "0",
      },
    ],
    deductions: [
      {
        category: "PF",
        isPercentage: true,
        percentage: "0",
      },
      {
        category: "LIC",
        isPercentage: true,
        percentage: "0",
      },
      {
        category: "GLIC",
        isPercentage: true,
        percentage: "0",
      },
      {
        category: "ITax",
        isPercentage: true,
        percentage: "0",
      },
      {
        category: "GPF",
        isPercentage: true,
        percentage: "0",
      },
      {
        category: "GPFL",
        isPercentage: true,
        percentage: "0",
      },
      {
        category: "GSLI",
        isPercentage: true,
        percentage: "0",
      },
    ],
  };

  const {
    full_name: { first_name = "", last_name = "" } = {},
    mobile_number = "",
    email_id = "",
    date_of_joining = "",
    department,
    date_of_birth,
    gender,
    isSuperAdmin,
    is_technical,
  } = userInformation;

  const { earnings, deductions } = existingSalaryConfig;

  useEffect(() => {
    if (earnings?.length > 0 && deductions?.length > 0) {
      if (!isEdit && values.faculty_id) {
        setSalaryConfigExists(true);
        setcustomPopupTitle(
          "Salary configuration already exists, you can only edit the existing configuration."
        );
        setcustomPopupContent(
          <div className="popup-content" style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="mr-3 btn btn-primary"
              onClick={() => {
                setopenEventPopup(false);
                formik.resetForm();
                setTimeout(() => history.push("/salary/edit-salary-slip"), 0);
              }}
            >
              Continue to edit
            </button>
            <button
              type="submit"
              className="mr-3 btn btn-primary"
              onClick={() => {
                dispatch({ type: "RESET_USER_PROFILE" });
                formik.resetForm();
                dispatch({ type: "RESET_SALARY_CONFIG" });
                setopenEventPopup(false);
              }}
            >
              Cancel
            </button>
          </div>
        );
        setopenEventPopup(true);
      } else populateExistingSalaryConfig();
    } else {
      setopenEventPopup(false);
      setSalaryConfigExists(false);
    }
  }, [existingSalaryConfig, isEdit]);

  const populateExistingSalaryConfig = () => {
    if (isEdit) {
      formik.setValues(existingSalaryConfig);
    }
  };
  const newValues = { ...initialValues };

  const validateSchema = Yup.object().shape({
    faculty_id: Yup.string().required("College Id is required"),
  });

  const formik = useFormik({
    initialValues: newValues,
    validationSchema: validateSchema,
    onSubmit: () => handleFormSubmit(),
  });

  const handleFormSubmit = () => {
    if (isCreate) {
      if (values.earnings[1].percentage === "" && !keepDASame) {
        setcustomPopupTitle("DA is not declared, continue to add DA first.");
        setcustomPopupContent(
          <div className="popup-content" style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="mr-3 btn btn-primary"
              onClick={() => {
                setopenEventPopup(false);
                setActiveTab(2);
              }}
            >
              Continue to add
            </button>
          </div>
        );
      } else {
        setcustomPopupTitle(
          `DA is currently '${values.earnings[1].percentage}%', continue or edit?`
        );
        setcustomPopupContent(
          <div className="popup-content" style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="mr-3 btn btn-primary"
              onClick={() => {
                setopenEventPopup(false);
                continueCreateSalaryForm();
                setKeepDASame(true);
              }}
            >
              Continue with {values.earnings[1].percentage}%
            </button>
            <button
              type="submit"
              className="mr-3 btn btn-primary"
              onClick={() => {
                setopenEventPopup(false);
                setActiveTab(2);
                // existingDA(values.earnings[1].percentage);
              }}
            >
              Edit/Modify
            </button>
          </div>
        );
      }
      setopenEventPopup(true);
    }
  };

  const continueCreateSalaryForm = () => {
    setisLoading(true);
    console.log("setFacultySalaryCustomization", formik.values);
    const temp = formik.values;
    const newEarnings = temp.earnings.filter((val) => val.category !== "DA");
    const requestParam = {
      faculty_id: formik.values.faculty_id,
      created_by: formik.values.created_by,
      last_edited_by: formik.values.last_edited_by,
      earnings: newEarnings,
      deductions: formik.values.deductions,
    };
    dispatch(
      setFacultySalaryCustomization(
        requestParam,
        setFacultySalaryCustomizationCallback
      )
    );
  };

  const setFacultySalaryCustomizationCallback = (resp) => {
    setisLoading(false);
    if (resp.message === "saved") {
      toast.success("Salary customization saved successfully.");
      formik.resetForm();
      fetchDA();
    } else toast.error("Couldn't save salary customization, please try again.");
  };

  const { values = {} } = formik;

  const onButtonClick = () => {
    const searchErrorCallback = () =>
      toast.error("Id not found. Please try again...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    const salaryErrorCallback = () =>
      toast.error("No previous salary customization found", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    const callbacks = {
      searchErrorCallback,
      salaryErrorCallback,
    };
    verifyAndSearchUser(values.faculty_id, callbacks);
  };

  const renderAbbr = () => {
    return (
      <Fragment>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">PF:</div>
          <div className="bd-highlight">Provident Fund</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">HRA:</div>
          <div className="bd-highlight">House Rent Allowance</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">DA:</div>
          <div className="bd-highlight">Dearness allowance</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">CA:</div>
          <div className="bd-highlight">City Allowance</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">GPF:</div>
          <div className="bd-highlight">General Provident Fund</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">LIC:</div>
          <div className="bd-highlight">Life Insurance</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">GPFL:</div>
          <div className="bd-highlight">General Provident Fund Loan</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">GLIC:</div>
          <div className="bd-highlight">Group Life Insurance</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">GSLI:</div>
          <div className="bd-highlight">Group Scheme Life Insurance</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">ITax:</div>
          <div className="bd-highlight">Income Tax</div>
        </div>
      </Fragment>
    );
  };

  const updateField = (fieldName = "", realValue, newValue, type) => {
    updateConfiguration(type, fieldName, newValue);
  };

  const updateConfiguration = (type, fieldName, newValue) => {
    const requestObj = {
      faculty_id: formik.values.faculty_id,
      edited_by: editorId,
      edited_on: new Date().toISOString().substring(0, 10),
      category_type: type,
      category: fieldName,
      isPercentage:
        type === "earnings"
          ? existingSalaryConfig.earnings.filter(
              (val) => val.category === fieldName
            )[0].isPercentage
          : existingSalaryConfig.deductions.filter(
              (val) => val.category === fieldName
            )[0].isPercentage,
      percentage: newValue,
      amount: newValue,
    };
    const callbacks = {
      successCallback: updateSuccessCallback,
      failureCallback: updateFailureCallback,
    };
    const updateObj = {
      ...updateArr,
      [fieldName]: true,
    };
    setUpdateArr(updateObj);
    dispatch(updateSalaryCustomization(requestObj, callbacks));
  };

  const updateSuccessCallback = (updatedSalaryCustomization, category) => {
    formik.setValues(updatedSalaryCustomization);
    dispatch({
      type: "SAVE_SALARY_CONFIG",
      payload: { data: updatedSalaryCustomization },
    });
    toast.success(`Salary configuration updated successfully for: ${category}`);
    setUpdateArr({});
  };

  const updateFailureCallback = (resp) => {
    toast.error("Couldn't update salary customization, please try again.");
    setUpdateArr({});
  };

  const renderUpdateBtn = (fieldName = "", realValue, newValue, type) => {
    if (isCreate || realValue === newValue) {
      return null;
    }

    if (isUpdating && updateArr[fieldName]) {
      return <i className="fa fa-circle-o-notch fa-spin fa-fw ml-3"></i>;
    } else {
      return (
        <Fragment>
          <button
            className="ml-3 btn btn-primary btn-sm"
            onClick={() => updateField(fieldName, realValue, newValue, type)}
          >
            Update
          </button>
        </Fragment>
      );
    }
  };

  const renderContent = () => {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{`${
            isCreate ? "Create" : "Edit"
          } salary slip configurations for the employees`}</h3>
        </div>
        <div className="card-body">
          {!isEdit && (
            <Typography
              className={classes.subHeading}
              as="div"
              variant="subtitle2"
            >
              Search for the employee by entering their college ID
            </Typography>
          )}
          {renderSalaryForm2()}
          <hr className="section-hr" />
          <div className="mt-4">{renderAbbr()}</div>
        </div>
      </div>
    );
  };

  const renderSalaryForm2 = () => {
    return (
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
          <div id="top" style={{ display: "flex", flexDirection: "row" }}>
            <div
              id="left"
              className="col-md-6"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="form-group">
                <label style={{ width: "25%", cursor: "pointer" }}>
                  College ID:
                </label>
                {isCreate && (
                  <Field
                    name="faculty_id"
                    style={{ width: "50%" }}
                    placeholder="Faculty Id"
                    type="text"
                    value={values.faculty_id}
                  />
                )}
                {isEdit && (
                  <input
                    style={{ width: "50%" }}
                    placeholder="Faculty Id"
                    type="text"
                    value={userInformation.faculty_id}
                    disabled={isEdit}
                  />
                )}
                {!isEdit && (
                  <Fragment>
                    <button
                      className={`ml-3 btn ${
                        values.faculty_id ? "btn-primary" : "btn-secondary"
                      } btn-sm`}
                      onClick={onButtonClick}
                      disabled={!values.faculty_id || searchingUser}
                    >
                      Check
                    </button>
                    {searchingUser && (
                      <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>
                    )}
                  </Fragment>
                )}
              </div>
              <div className="form-group">
                <label style={{ width: "25%", cursor: "pointer" }}>First Name:</label>
                <input
                  name="full_name.first_name"
                  style={{ width: "50%" }}
                  placeholder="First Name"
                  type="text"
                  value={first_name}
                  disabled
                />
              </div>
              <div className="form-group">
                <label style={{ width: "25%", cursor: "pointer" }}>Last Name:</label>
                <input
                  name="full_name.last_name"
                  style={{ width: "50%" }}
                  placeholder="Last Name"
                  type="text"
                  value={last_name || "-"}
                  disabled
                />
              </div>
              <div className="form-group">
                <label style={{ width: "25%", cursor: "pointer" }}>Department:</label>
                <input
                  name="designation"
                  style={{ width: "50%" }}
                  placeholder="---"
                  type="text"
                  value={department}
                  disabled
                />
              </div>
              <div className="form-group">
                <label style={{ width: "25%", cursor: "pointer" }}>Joining Date:</label>
                <input
                  name="joining_date"
                  style={{ width: "50%" }}
                  placeholder="DD-MM-YYYY"
                  type="date"
                  value={
                    date_of_joining &&
                    new Date(date_of_joining).toISOString().substring(0, 10)
                  }
                  disabled
                />
              </div>
              <div className="form-group">
                <label style={{ width: "25%", cursor: "pointer" }}>Email:</label>
                <input
                  name="email"
                  style={{ width: "50%" }}
                  placeholder="abc@example.com"
                  type="text"
                  value={email_id}
                  disabled
                />
              </div>
            </div>
            <div
              id="right"
              className="col-md-6"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="form-group">
                <label style={{ width: "25%", cursor: "pointer" }}>Gender:</label>
                {gender}
              </div>
              <div className="form-group">
                <label style={{ width: "25%", cursor: "pointer" }}>Super Admin:</label>
                {isSuperAdmin ? "Yes" : "No"}
              </div>
              <div className="form-group">
                <label style={{ width: "25%", cursor: "pointer" }}>Teaching/Non-teaching:</label>
                {/* <Field
									name="PAN"
									style={{ width: "50%" }}
									placeholder="xxxxxxxxxx"
									type="text"
									maxLength="10"
									value={values.PAN}
									disabled
								/> */}
                {is_technical ? "Teaching" : "Non-Teaching" || "-"}
              </div>
              <div className="form-group">
                <label style={{ width: "25%", cursor: "pointer" }}>Date of birth:</label>
                <Field
                  name="accountNumber"
                  style={{ width: "50%" }}
                  placeholder="DD-MM-YYYY"
                  type="date"
                  value={
                    date_of_birth &&
                    new Date(date_of_birth).toISOString().substring(0, 10)
                  }
                  disabled
                />
              </div>
              <div className="form-group">
                <label style={{ width: "25%", cursor: "pointer" }}>Phone:</label>
                <input
                  name="phone"
                  style={{ width: "50%" }}
                  placeholder="---"
                  type="text"
                  value={mobile_number}
                  disabled
                />
              </div>
            </div>
          </div>
          <hr className="section-hr" />
          <Typography variant="subtitle1">Earnings:</Typography>
          <br />
          <div id="middle" style={{ display: "flex", flexDirection: "row" }}>
            <div
              id="left"
              className="col-md-6"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="form-group">
                <label title="Basic salary" sx={{ width: "25%", cursor: "pointer" }}>
                  Basic pay:&nbsp;&#8377;
                </label>
                <Field
                  name={`earnings[0].amount`}
                  style={{ width: "50%" }}
                  placeholder="0"
                  type="number"
                  value={values.earnings[0].amount}
                />
                {renderUpdateBtn(
                  "basic",
                  earnings?.filter((val) => val.category === "basic")[0]
                    ?.amount,
                  values.earnings[0].amount,
                  "earnings"
                )}
              </div>
              <div className="form-group">
                <label title="Dearness allowance" sx={{ width: "25%", cursor: "pointer" }}>
                  DA:&nbsp;%
                </label>
                {isCreate
                  ? fetchedDA
                    ? fetchedDA
                    : "-"
                  : values.earnings[1].percentage}
              </div>
            </div>
            <div
              id="right"
              className="col-md-6"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="form-group">
                <label title="House Rent Allowance" sx={{ width: "25%", cursor: "pointer" }}>
                  HRA:&nbsp;%
                </label>
                <Field
                  name="earnings[2].percentage"
                  style={{ width: "50%" }}
                  placeholder="0%"
                  type="number"
                  value={values.earnings[2].percentage}
                />
                {renderUpdateBtn(
                  "HRA",
                  earnings?.filter((val) => val.category === "HRA")[0]
                    ?.percentage,
                  values.earnings[2].percentage,
                  "earnings"
                )}
              </div>
              <div className="form-group">
                <label title="City Allowance" sx={{ width: "25%", cursor: "pointer" }}>
                  CA:&nbsp;%
                </label>
                <Field
                  name="earnings[3].percentage"
                  style={{ width: "50%" }}
                  placeholder="0%"
                  type="number"
                  value={values.earnings[3].percentage}
                />
                {renderUpdateBtn(
                  "CA",
                  earnings?.filter((val) => val.category === "CA")[0]
                    ?.percentage,
                  values.earnings[3].percentage,
                  "earnings"
                )}
              </div>
            </div>
          </div>
          <hr className="section-hr" />
          <Typography variant="subtitle1">Deductions:</Typography>
          <br />
          <div id="bottom" style={{ display: "flex", flexDirection: "row" }}>
            <div
              id="left"
              className="col-md-6"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="form-group">
                <label title="Provident Fund" sx={{ width: "25%", cursor: "pointer" }}>
                  PF:&nbsp;%
                </label>
                <Field
                  name="deductions[0].percentage"
                  style={{ width: "50%" }}
                  placeholder="0%"
                  type="number"
                  value={values.deductions[0].percentage}
                />
                {renderUpdateBtn(
                  "PF",
                  deductions?.filter((val) => val.category === "PF")[0]
                    ?.percentage,
                  values.deductions[0].percentage,
                  "deductions"
                )}
              </div>
              <div className="form-group">
                <label title="Life Insurance" sx={{ width: "25%", cursor: "pointer" }}>
                  LIC:&nbsp;%
                </label>
                <Field
                  name="deductions[1].percentage"
                  style={{ width: "50%" }}
                  placeholder="0%"
                  type="number"
                  value={values.deductions[1].percentage}
                />
                {renderUpdateBtn(
                  "LIC",
                  deductions?.filter((val) => val.category === "LIC")[0]
                    ?.percentage,
                  values.deductions[1].percentage,
                  "deductions"
                )}
              </div>
              <div className="form-group">
                <label title="Group Life Insurance" sx={{ width: "25%", cursor: "pointer" }}>
                  GLIC:&nbsp;%
                </label>
                <Field
                  name="deductions[2].percentage"
                  style={{ width: "50%" }}
                  placeholder="0%"
                  type="number"
                  value={values.deductions[2].percentage}
                />
                {renderUpdateBtn(
                  "GLIC",
                  deductions?.filter((val) => val.category === "GLIC")[0]
                    ?.percentage,
                  values.deductions[2].percentage,
                  "deductions"
                )}
              </div>
              <div className="form-group">
                <label title="Income Tax" sx={{ width: "25%", cursor: "pointer" }}>
                  ITax:&nbsp;%
                </label>
                <Field
                  name="deductions[3].percentage"
                  style={{ width: "50%" }}
                  placeholder="0%"
                  type="number"
                  value={values.deductions[3].percentage}
                />
                {renderUpdateBtn(
                  "ITax",
                  deductions?.filter((val) => val.category === "ITax")[0]
                    ?.percentage,
                  values.deductions[3].percentage,
                  "deductions"
                )}
              </div>
            </div>
            <div
              id="right"
              className="col-md-6"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="form-group">
                <label title="General Provident Fund" sx={{ width: "25%", cursor: "pointer" }}>
                  GPF:&nbsp;%
                </label>
                <Field
                  name="deductions[4].percentage"
                  style={{ width: "50%" }}
                  placeholder="0%"
                  type="number"
                  value={values.deductions[4].percentage}
                />
                {renderUpdateBtn(
                  "GPF",
                  deductions?.filter((val) => val.category === "GPF")[0]
                    ?.percentage,
                  values.deductions[4].percentage,
                  "deductions"
                )}
              </div>
              <div className="form-group">
                <label
                  title="General Provident Fund Loan"
                  sx={{ width: "25%", cursor: "pointer" }}
                >
                  GPFL:&nbsp;%
                </label>
                <Field
                  name="deductions[5].percentage"
                  style={{ width: "50%" }}
                  placeholder="0%"
                  type="number"
                  value={values.deductions[5].percentage}
                />
                {renderUpdateBtn(
                  "GPFL",
                  deductions?.filter((val) => val.category === "GPFL")[0]
                    ?.percentage,
                  values.deductions[5].percentage,
                  "deductions"
                )}
              </div>
              <div className="form-group">
                <label
                  title="Group Scheme Life Insurance"
                  sx={{ width: "25%", cursor: "pointer" }}
                >
                  GSLI:&nbsp;%
                </label>
                <Field
                  name="deductions[6].percentage"
                  style={{ width: "50%" }}
                  placeholder="0%"
                  type="number"
                  value={values.deductions[6].percentage}
                />
                {renderUpdateBtn(
                  "GSLI",
                  deductions?.filter((val) => val.category === "GSLI")[0]
                    ?.percentage,
                  values.deductions[6].percentage,
                  "deductions"
                )}
              </div>
            </div>
          </div>
          {openEventPopup && (
            <Popup
              title={customPopupTitle}
              onCloseClick={() => setopenEventPopup(false)}
              content={customPopupContent}
            />
          )}
          {isCreate && (
            <Fragment>
              {isLoading ? (
                <i className="fa fa-circle-o-notch fa-spin fa-fw ml-3"></i>
              ) : (
                <button
                  type="submit"
                  className="mr-3 btn btn-primary"
                  disabled={!verificationSuccess}
                >
                  Submit
                </button>
              )}
            </Fragment>
          )}
        </Form>
      </FormikProvider>
    );
  };

  return (
    <Fragment>
      {renderContent()}
      <ToastContainer />
    </Fragment>
  );
};

export default CreateSalaryForm;
