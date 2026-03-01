import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateSalaryForm from "./CreateSalaryForm";
import { searchUser, resetForm } from "../../api/salaryApi";
import classnames from "classnames";
import { Nav, NavLink, NavItem } from "reactstrap";
import { TabContent, TabPane } from "reactstrap";
import { Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import {
  setUniMonthlySalary,
  resetExistingSalaryConfig,
} from "../../api/salaryApi";
import NoPermission from "../../common/NoPermission";

const CreateSalary = (props = {}) => {
  const { isSuperAdmin, permissions = {}, history } = props;

  const dispatch = useDispatch();
  const verifyAndSearchUser = (e, ecb) => dispatch(searchUser(e, ecb));
  const resetCreateSalary = () => dispatch(resetForm());
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setisLoading] = useState(false);

  const state = useSelector((state) => state);
  const { salaryReducer = {}, authenticationReducer: { userProfile } = {} } =
    state;
  const { faculty_id } = userProfile;
  const {
    verificationSuccess,
    verifyApiCalled,
    userInformation = {},
    searchingUser,
    existingSalaryConfig = {},
    existingDAPercentage
  } = salaryReducer;

  useEffect(() => {
    resetCreateSalary();
    dispatch({ type: "RESET_SALARY_CONFIG" });
  }, []);

  useEffect(() => {
    formik.setFieldValue("earnings[0].percentage", existingDAPercentage);
  }, [existingDAPercentage]);

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

  const initialValues = {
    created_by: faculty_id,
    month: months[new Date().getMonth()],
    year: new Date().getFullYear(),
    earnings: [
      {
        category: "DA",
        isPercentage: true,
        percentage: existingDAPercentage,
      },
    ],
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
    setisLoading(true);
    const callbacks = {
      successCallback: setUniMonthlySalarySuccessCallback,
      failureCallback: setUniMonthlySalaryFailureCallback,
    };
    dispatch(setUniMonthlySalary(formik.values, callbacks));
  };

  const setUniMonthlySalarySuccessCallback = () => {
    setisLoading(false);
    toast.success(
      `DA successfully saved for the month of ${months[new Date().getMonth()]}`
    );
    // setActiveTab(1);
  };

  const setUniMonthlySalaryFailureCallback = (error) => {
    setisLoading(false);
    toast.error(error);
  };

  const { values = {} } = formik;

  const renderSalaryForm = () => {
    return (
      <CreateSalaryForm
        isCreate
        verifyAndSearchUser={verifyAndSearchUser}
        verificationSuccess={verificationSuccess}
        verifyApiCalled={verifyApiCalled}
        userInformation={userInformation}
        searchingUser={searchingUser}
        currentUser={faculty_id}
        setActiveTab={setActiveTab}
        existingDA={existingDAPercentage}
        existingSalaryConfig={existingSalaryConfig}
        clearExistingSalaryConfig={() => dispatch(resetExistingSalaryConfig())}
        history={history}
        permissions={permissions}
        activeTab={activeTab}
      />
    );
  };

  const renderHeader = () => {
    return (
      <Fragment>
        <div className="section-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="header-action">
                <h1 className="page-title">Create Salary Slip</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item">
                    <span>Amiruddaula Islamia Degree College</span>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Create Salary Slip
                  </li>
                </ol>
              </div>
              <Nav tabs className="page-header-tab">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 1 })}
                    onClick={() => setActiveTab(1)}
                  >
                    Create Salary
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 2 })}
                    onClick={() => setActiveTab(2)}
                  >
                    Add/Edit DA %
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            {!isSuperAdmin && !permissions.create && (
              <div className="mt-1" style={{ color: "red" }}>
                *You do not have required permissions to create employee salary.
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  };

  if (!isSuperAdmin && !permissions.read) {
    return <NoPermission />;
  }

  return (
    <Fragment>
      {renderHeader()}
      <div className="section-body mt-4">
        <div className="container-fluid">
          <TabContent activeTab={activeTab}>
            <TabPane tabId={1} className={classnames(["fade show"])}>
              {renderSalaryForm()}
            </TabPane>
          </TabContent>
          <TabContent activeTab={activeTab}>
            <TabPane tabId={2} className={classnames(["fade show"])}>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    Add/Edit common field(s) for all
                  </h3>
                </div>
                <div className="card-body">
                  <Typography
                    style={{
                      paddingBottom: 20,
                      color: "blue",
                    }}
                    as="div"
                    variant="subtitle2"
                  >
                    Below mentioned field(s) will be applicable for all
                  </Typography>
                  <FormikProvider value={formik}>
                    <Form
                      onSubmit={formik.handleSubmit}
                      style={{ display: "contents" }}
                    >
                      <div className="form-group">
                        <label
                          title="Dearness allowance"
                          style={{
                            cursor: "pointer",
                            width: "5%",
                          }}
                        >
                          DA:&nbsp;%
                        </label>
                        <Field
                          name="earnings[0].percentage"
                          placeholder="0%"
                          type="number"
                          value={values.earnings[0].percentage}
                          style={{
                            width: "20%",
                          }}
                        />
                      </div>

                      {isLoading ? (
                        <i className="fa fa-circle-o-notch fa-spin fa-fw ml-3"></i>
                      ) : (
                        <button
                          type="submit"
                          className="mr-3 btn btn-primary"
                          disabled={!values.earnings[0].percentage}
                          onClick={() => handleFormSubmit()}
                        >
                          Submit
                        </button>
                      )}
                    </Form>
                  </FormikProvider>
                  <hr className="section-hr" />
                  <div className="d-flex bd-highlight mt-4">
                    <div className="w-10 bd-highlight">DA:</div>
                    <div className="bd-highlight">Dearness allowance</div>
                  </div>
                </div>
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default CreateSalary;



