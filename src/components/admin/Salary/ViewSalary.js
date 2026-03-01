import React, { Fragment, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Input, Modal, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  getFacultySalaryCustomization,
  calculateSalaryForMonth,
} from "../../api/salaryApi";
import StaticSalaryForm from "./StaticSalaryForm";
import { ToastContainer, toast } from "react-toastify";

export default function ViewSalary() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { salaryReducer = {} } = state;
  const { searchingSalarySlip, existingSalaryConfig = {} } = salaryReducer;
  const { authenticationReducer: { userProfile } = {} } = state;
  const { faculty_id } = userProfile;
  const [selectedMonthYear, setSelectedMonthYear] = useState(moment(new Date()));
  const [noSalaryConfigurations, setNoSalaryConfigurations] = useState(false);
  const [salarySlipData, setSalarySlipData] = useState({});
  const [isSalarySlip, setisSalarySlip] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const months = [
    "JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC",
  ];
  const { created_by } = existingSalaryConfig;

  useEffect(() => {
    dispatch(getFacultySalaryCustomization({ faculty_id: faculty_id }, getSalaryCustomizationFailureCallback));
  }, []);

  const getSalaryCustomizationFailureCallback = () => {
    console.log("getSalaryCustomizationFailureCallback");
    setNoSalaryConfigurations(true);
  }

  useEffect(() => {
    if (!existingSalaryConfig._id) {
      setNoSalaryConfigurations(true);
    } else {
      setNoSalaryConfigurations(false);
    }
  }, [existingSalaryConfig]);

  const handleFetchSalarySlip = () => {
    setisLoading(true);
    const requestBody = {
      month: months[new Date(selectedMonthYear).getMonth()],
      year: new Date(selectedMonthYear).getFullYear(),
      faculty_id: faculty_id,
      created_by: created_by,
    };
    const callbacks = {
      successCallback: salaryForMonthSuccessCallback,
      failureCallback: salaryForMonthFailureCallback,
    };
    dispatch(calculateSalaryForMonth(requestBody, callbacks));
  };

  const salaryForMonthSuccessCallback = (data) => {
    setisLoading(false);
    toast.success("Salary slip fetched successfully.");
    setisSalarySlip(true);
    setSalarySlipData(data);
  };

  const salaryForMonthFailureCallback = () => {
    setisLoading(false);
    toast.error("Failed to fetch salary slip.");
    setisSalarySlip(false);
  };

  const renderHeader = () => {
    return (
      <Fragment>
        <div className="section-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="header-action">
                <h1 className="page-title">View Salary Slips</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item">
                    <a>Amiruddaula Islamia Degree College</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    View Salary Slips
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
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">View your monthly salary slips</h3>
        </div>

        <div className="card-body">
          {noSalaryConfigurations && (
            <Typography
              sx={{ paddingBottom: 2, color: "blue" }}
              as="div"
              variant="subtitle2"
            >
              Your Salary configurations are not yet declared, please consult
              your IT department!
            </Typography>
          )}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year", "month"]}
              label="Year and Month"
              minDate={new Date("2012-03-01")}
              maxDate={new Date()}
              value={selectedMonthYear}
              onChange={(newValue) => setSelectedMonthYear(newValue)}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
            <Stack
              spacing={4}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                my: 2,
                display: "inline-flex",
                mt: 2,
                cursor: "pointer",
                ml: 2,
              }}
            >
              {isLoading ? (
                <i className="fa fa-circle-o-notch fa-spin fa-fw ml-3"></i>
              ) : (
                <LoadingButton
                  disabled={noSalaryConfigurations}
                  loading={searchingSalarySlip}
                  variant="contained"
                  size="long"
                  onClick={() => handleFetchSalarySlip()}
                >
                  Fetch slip
                </LoadingButton>
              )}
            </Stack>
          </LocalizationProvider>
          <div>
            {isSalarySlip && (
              <Fragment>
                <hr />
                <StaticSalaryForm
                  profileData={userProfile}
                  salarySlipData={salarySlipData}
                  selectedMonth={months[new Date(selectedMonthYear).getMonth()]}
                  selectedYear={new Date(selectedMonthYear).getFullYear()}
                />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  };

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
