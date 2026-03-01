import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser, resetForm, resetExistingSalaryConfig } from "../../api/salaryApi";
import CreateSalaryForm from "./CreateSalaryForm";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NoPermission from '../../common/NoPermission';

export default function EditSalary(props = {}) {
  const {isSuperAdmin, permissions = {}, history} = props;

  const [employeeId, setEmployeeId] = useState("");

  const dispatch = useDispatch();
  const verifyAndSearchUser = (e, ecb) => dispatch(searchUser(e, ecb));
  const resetEditSalary = () => dispatch(resetForm());

  const state = useSelector((state) => state);
  const { salaryReducer = {} } = state;
  const {
    verificationSuccess,
    verifyApiCalled,
    userInformation = {},
    searchingUser,
    existingSalaryConfig = {},
    isUpdatingConfiguration
  } = salaryReducer;
  const { authenticationReducer: { userProfile } = {} } = state;
  const { faculty_id: edited_by } = userProfile;

  useEffect(() => {
    if (Object.keys(existingSalaryConfig).length) {
      const { faculty_id } = existingSalaryConfig;
      setEmployeeId(faculty_id);
      dispatch({ type: "RESET_SALARY_CONFIG" });
      setTimeout(() => {
        verifyAndSearchUser(faculty_id);
      }, 0);
      resetEditSalary();
    } else {
      resetEditSalary();
    }

    return () => {
      dispatch(resetExistingSalaryConfig());
    }
  }, []);

  const onButtonClick = () => {
    const searchErrorCallback = () => toast.error('Id not found. Please try again...', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    const salaryErrorCallback = (message) => toast.error(message, {
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
      salaryErrorCallback
    }
    verifyAndSearchUser(employeeId, callbacks);
  };

  const renderHeader = () => {
    return (
      <Fragment>
        <div className="section-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="header-action">
                <h1 className="page-title">Edit Salary Slip</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item">
                    <span>Amiruddaula Islamia Degree College</span>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Edit Employee Salary
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const renderContent = () => {
    let customClass = "";
    if (verifyApiCalled) {
      if (verificationSuccess) {
        customClass = "success";
      } else {
        customClass = "failed";
      }
    }
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Edit Employee Salary</h3>
        </div>
        <div className="card-body">
          <div className="col-md-9 row">
            <label className="col-md-3 col-form-label">
              Enter Faculty Id<span className="text-danger">*</span>
            </label>
            <div className="col-md-6">
              <input
                type="text"
                className={`form-control ${customClass}`}
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
            {searchingUser ? <i className="fa fa-circle-o-notch fa-spin fa-fw ml-3 mt-2" style={{height: "fit-content"}}></i>
              :
              (<button
                id="search-user-btn"
                className="btn btn-primary col-md-3"
                disabled={!employeeId}
                type="button"
                onClick={onButtonClick}
              >
                Search
              </button>)}
          </div>
          {verificationSuccess && Object.keys(existingSalaryConfig).length > 0 && (
            <Fragment>
              <hr />
              <CreateSalaryForm
                isEdit
                userInformation={userInformation}
                verificationSuccess={verificationSuccess}
                verifyApiCalled={verifyApiCalled}
                searchingUser={searchingUser}
                existingSalaryConfig={existingSalaryConfig}
                editorId={edited_by}
                history={history}
                isUpdating={isUpdatingConfiguration}
              />
            </Fragment>
          )}
        </div>
      </div>
    );
  };

  if (!isSuperAdmin && !permissions.read) {
    return <NoPermission />;
  }

  return (
    <Fragment>
      {renderHeader()}
      <div className="section-body mt-4">
        <div className="container-fluid">{renderContent()}</div>
      </div>
      <ToastContainer />
    </Fragment>
  );
}



