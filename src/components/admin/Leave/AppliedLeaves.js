import React, { Fragment, useState } from "react";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import { Button, Input, Modal, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllLeavesByIdAndDate,
  withdrawLeave,
  withdrawApprovedLeave,
} from "../../api/LeaveApi";
import { Box } from "@mui/system";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  boxSizing: "content-box",
};
export default function AppliedLeaves() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state) || {};
  const { authenticationReducer: { userProfile } = {} } = state;
  const { faculty_id } = userProfile;
  const {
    leaveReducer: {
      allAppliedLeaves = [],
      isLoadingAppliedLeaves = "",
      noLeavesFound = "",
    },
  } = state;
  const [openModal, setopenModal] = useState(false);
  const [withdrawReason, setWithdrawReason] = useState("");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [fromDate, setFromDate] = useState(
    moment(new Date()).subtract(1, "month").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const leaveTypes = {
    cl: "Casual Leave",
    sl: "Sick Leave",
    el: "Earned Leave",
    pl: "Privelage Leave",
    mtl: "Maternity Leave",
    ptl: "Paternity Leave",
    lwp: "Leave Without Pay",
    chcl: "Child Care Leave",
    ccl: "Comprehension Casual Leave",
    dl: "Duty Leave",
  };
  const handleSubmit = () => {
    if (fromDate && toDate && fromDate < toDate) {
      const requestParam = {
        faculty_id: faculty_id,
        startingDate: fromDate,
        endingDate: toDate,
      };
      dispatch(fetchAllLeavesByIdAndDate(requestParam));
    } else {
      alert("please enter valid dates first");
      return true;
    }
  };
  const handleWithdraw = () => {
    if (selectedLeave?.status === "Approved") {
      const requestParam = {
        leaveId: selectedLeave._id,
        withdrawReason: withdrawReason,
        allAppliedLeaves: allAppliedLeaves,
        userId: faculty_id,
      };
      dispatch(withdrawApprovedLeave(requestParam, handleDiscardWithdraw));
    } else {
      const requestParam = {
        leaveId: selectedLeave._id,
        withdrawReason: withdrawReason,
        allAppliedLeaves: allAppliedLeaves,
        userId: faculty_id,
      };
      dispatch(withdrawLeave(requestParam, handleDiscardWithdraw));
    }
  };
  const handleContinueWithdraw = () => {
    if (withdrawReason) {
      handleWithdraw();
      setopenModal(false);
    } else {
      alert("Please enter reason for withdraw");
      return true;
    }
  };
  const handleDiscardWithdraw = () => {
    setSelectedLeave(null);
    setWithdrawReason("");
    setopenModal(false);
  };

  const renderHeader = () => {
    return (
      <Fragment>
        <div className="section-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="header-action">
                <h1 className="page-title">Applied Leaves</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item">
                    <span>Amiruddaula Islamia Degree College</span>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Applied leaves
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
          <h3 className="card-title">Check leaves you applied till now</h3>
        </div>
        <div className="card-body">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="From"
              inputFormat="dd MMM yyyy"
              value={fromDate}
              onChange={(date) =>
                setFromDate(moment(date).format("YYYY-MM-DD"))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "20%", outline: "none", marginRight: "1rem" }}
                  helperText={null}
                />
              )}
            />
            <DesktopDatePicker
              // minDate={fromDate}
              label="To"
              inputFormat="dd MMM yyyy"
              value={toDate}
              onChange={(date) => setToDate(moment(date).format("YYYY-MM-DD"))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "20%", outline: "none", marginRight: "2rem" }}
                  helperText={null}
                />
              )}
            />
            <Stack
              spacing={3}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                my: 2,
                display: "inline-flex",
                mt: 2,
                cursor: "pointer",
              }}
            >
              <Button variant="contained" size="long" onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
          </LocalizationProvider>
          <div>
            {noLeavesFound ? (
              <div style={{ color: "red" }}>No leaves found</div>
            ) : (
              "Select valid date range to fetch your leaves"
            )}
            {isLoadingAppliedLeaves && (
              <div style={{ textAlign: "center" }}>
                <i className="fa fa-circle-o-notch fa-spin fa-fw mr-2"></i>
              </div>
            )}
            {allAppliedLeaves?.length > 0 && <>{renderViewLeaves()}</>}
          </div>
        </div>
      </div>
    );
  };
  const renderViewLeaves = () => {
    return (
      <div className="card">
        <div className="card-body">
          <div
            className="table-responsive"
            style={{
              height: "54vh",
              lineHeight: "0.6rem",
              overflowX: "hidden",
            }}
          >
            {" "}
            <div className="leavetable-count">
              Total leaves count: {allAppliedLeaves.length}
            </div>
            <table
              className="table table-hover table-vcenter text-nowrap js-basic-example dataTable table-striped table_custom border-style spacing5"
              style={{ tableLayout: "fixed", overflow: "hidden" }}
            >
              <thead>
                <tr>
                  <th className="leavetable-head-index"></th>
                  <th className="leavetable-head-leave">Leave type</th>
                  <th className="leavetable-head-leave-range">Leaves</th>
                  <th className="leavetable-head-days">Days</th>
                  <th className="leavetable-head-reason">Reason</th>
                  <th className="leavetable-head-status">Status</th>
                  <th className="leavetable-head-remark">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {allAppliedLeaves.length > 0 &&
                  allAppliedLeaves
                    .sort(
                      (a, b) =>
                        moment(b.leave_created_at) - moment(a.leave_created_at)
                    )
                    .map((item, index) => {
                      const {
                        leave_type: leaveType,
                        reason_for_leave: reasonForLeave,
                        _id: leaveID,
                        leave_days: leaveCount,
                        status: leaveStatus,
                        comment: rejectionRemarks,
                        current_approver: currentApprover,
                        reason_for_action: reason,
                      } = item;
                      const showLeaves = (vals) => {
                        const {
                          leave_days_list = [],
                          starting_date: leaveFrom,
                          ending_date: leaveTo,
                        } = vals;

                        if (
                          leave_days_list.length < 1 &&
                          leaveFrom &&
                          leaveTo
                        ) {
                          return (
                            <td>
                              {moment(leaveFrom).format("DD MMM YY")} -{" "}
                              {moment(leaveTo).format("DD MMM YY")}
                            </td>
                          );
                        } else {
                          return <td>{leave_days_list.join(",")}</td>;
                        }
                      };
                      return (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              (leaveStatus === "Approved" && "#04ff0030") ||
                              (leaveStatus === "Rejected" && "#ff000030") ||
                              (leaveStatus === "Forwarded" && " #00b8ff30") ||
                              (leaveStatus === "Created" && "#ffffff30") ||
                              (leaveStatus === "Withdrawn" && "#0008ff30") ||
                              (leaveStatus === "Requested withdrawal" &&
                                "#ffd40030"),
                          }}
                        >
                          <td className="leave-table-index">{index + 1}</td>
                          <td className="leave-table-leave">
                            {leaveTypes[leaveType]}
                          </td>
                          <td className="leave-table-leave-range">
                            {showLeaves(item)}
                          </td>
                          <td className="leave-table-days">{leaveCount}</td>
                          <td className="leave-table-reason">
                            {reasonForLeave}
                          </td>
                          <td className="leave-table-status">
                            {leaveStatus === "Pending_Withdrawal"
                              ? "Pending"
                              : leaveStatus}
                          </td>
                          {leaveStatus !== "Created" &&
                          leaveStatus !== "Forwarded" &&
                          leaveStatus !== "Approved" ? (
                            <td className="leave-table-remarks">
                              {/* {leaveStatus === "Rejected" && `${reason}`} */}
                              {leaveStatus === "Pending_Withdrawal"
                                ? "Withdrawal pending"
                                : reason}
                            </td>
                          ) : (
                            <td className="leave-table-remarks">
                              {reason}
                              {leaveStatus === "Forwarded" &&
                                `Forwarded to ${currentApprover}`}
                              <Button
                                sx={{ marginLeft: "1rem" }}
                                variant="outlined"
                                size="small"
                                onClick={() => {
                                  setSelectedLeave(item);
                                  setopenModal(true);
                                }}
                              >
                                {leaveStatus === "Approved"
                                  ? "Request Withdrawal"
                                  : "Withdraw"}
                              </Button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {renderHeader()}
      <div className="section-body mt-4">
        <div className="container-fluid">{renderContent()}</div>
      </div>
      <Modal
        open={openModal}
        onClose={() => handleDiscardWithdraw()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="div">
            Why do you want to withdraw this{" "}
            {selectedLeave?.status === "Approved" && "approved"} leave?
          </Typography>
          <hr />
          <Stack spacing={3} direction={"row"}>
            <Input
              fullWidth
              autoFocus
              placeholder="Enter reason here"
              id="Withdrawn"
              defaultValue={withdrawReason}
              onChange={(event) => setWithdrawReason(event.target.value)}
            />
          </Stack>
          <Stack
            spacing={3}
            direction={"row"}
            style={{
              width: "max-content",
              margin: "auto",
              marginTop: "1.5rem",
              display: "flex",
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                handleContinueWithdraw();
              }}
            >
              Continue
            </Button>
            <Button
              variant="standard"
              size="small"
              onClick={() => {
                handleDiscardWithdraw();
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}



