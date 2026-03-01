import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Modal, Stack, Typography } from "@mui/material";
import moment from "moment";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import { verifyUser, dispatchVerifyActions } from "../../api/dashboardApi";
import {
  getAllUnapprovedLeaves,
  approveLeave,
  rejectLeave,
  forwardLeave,
  approveLeaveWithdrawal,
} from "../../api/LeaveApi";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

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
export default function ApproveLeaves() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state) || {};
  const { authenticationReducer: { userProfile } = {} } = state;
  const { faculty_id } = userProfile;
  const {
    dashboardReducer: {
      isVerifyingUser,
      verificationSuccess,
      verifyApiCalled,
    } = {},
  } = state;
  const {
    leaveReducer: {
      allUnapprovedLeaves,
      isLoadingUnapprovedLeaves = "",
      noLeavesForApprovalFound = "",
    } = [],
  } = state;
  const [openModal, setopenModal] = useState(false);
  const [openDocModal, setopenDocModal] = useState(false);
  const [showDocForLeave, setshowDocForLeave] = useState({});
  const [requestedAction, setrequestedAction] = useState("");
  const [requestedLeaveId, setrequestedLeaveId] = useState("");
  const [rejectionRemark, setrejectionRemark] = useState("");
  const [forwardedID, setforwardedID] = useState("");
  const [isVerified, setisVerified] = useState(false);

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

  useEffect(() => {
    dispatch(getAllUnapprovedLeaves(faculty_id));
  }, []);

  useEffect(() => {
    if (verificationSuccess) {
      setisVerified(true);
    } else {
      setisVerified(false);
    }
  }, [verificationSuccess]);

  const handleAction = (e, leaveID) => {
    const requestType = e.target.name;
    if (requestType === "Approve") {
      const requestParam = {
        leaveId: leaveID,
        allUnapprovedLeaves: allUnapprovedLeaves,
        approverId: faculty_id,
      };
      dispatch(approveLeave(requestParam));
      clearDependentStates();
    } else if (requestType === "Reject" || requestType === "Forward") {
      setrequestedAction(requestType);
      setrequestedLeaveId(leaveID);
      setopenModal(true);
    } else if (requestType === "ApproveWithdrawal") {
      const requestParam = {
        leaveId: leaveID,
        allUnapprovedLeaves: allUnapprovedLeaves,
        userId: faculty_id,
      };
      dispatch(
        approveLeaveWithdrawal(requestParam, approveLeaveWithdrawalCallback)
      );
    }
  };
  const approveLeaveWithdrawalCallback = () => {
    clearDependentStates();
  };
  const handleModalClose = () => setopenModal(false);
  const handleRejectRequest = () => {
    const requestParam = {
      rejectionRemark: rejectionRemark,
      leaveId: requestedLeaveId,
      allUnapprovedLeaves: allUnapprovedLeaves,
      approverId: faculty_id,
    };
    dispatch(rejectLeave(requestParam));
    clearDependentStates();
    handleModalClose();
  };
  const handleForwardRequest = () => {
    if (isVerified) {
      const requestParam = {
        forwardedID: forwardedID,
        leaveId: requestedLeaveId,
        allUnapprovedLeaves: allUnapprovedLeaves,
        approverId: faculty_id
      };
      dispatch(forwardLeave(requestParam));
      clearDependentStates();
      handleModalClose();
    } else {
      alert("Enter a verified user to forward the leave");
    }
  };
  const handleDiscardRequest = () => {
    clearDependentStates();
    handleModalClose();
  };
  const clearDependentStates = () => {
    setrequestedAction("");
    setrequestedLeaveId("");
    setrejectionRemark("");
    setforwardedID("");
    setisVerified(false);
    dispatch(dispatchVerifyActions());
  };
  const renderHeader = () => {
    return (
      <Fragment>
        <div className="section-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="header-action">
                <h1 className="page-title">Leaves Approval</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item">
                    <span>Amiruddaula Islamia Degree College</span>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Approve leaves
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
          <h3 className="card-title">Leaves to be approved by you</h3>
        </div>
        <div className="card-body">
          {/* {allUnapprovedLeaves.length < 1 ? (
            "No pending leaves for your approval"
          ) : (
            <>
              Below are the leaves in your inbox pending to be approved
              {isLoadingUnapprovedLeaves && (
                <div style={{ textAlign: "center" }}>
                  <i className="fa fa-circle-o-notch fa-spin fa-fw mr-2"></i>
                </div>
              )}
              {renderUnapprovedLeaves()}
            </>
          )} */}
          {noLeavesForApprovalFound ? (
            <div style={{ color: "red" }}>
              No pending leaves for your approval
            </div>
          ) : (
            "Below are the leaves in your inbox pending to be approved"
          )}
          {isLoadingUnapprovedLeaves && (
            <div style={{ textAlign: "center" }}>
              <i className="fa fa-circle-o-notch fa-spin fa-fw mr-2"></i>
            </div>
          )}
          {allUnapprovedLeaves.length > 0 && <>{renderUnapprovedLeaves()}</>}
        </div>
      </div>
    );
  };
  const renderUnapprovedLeaves = () => {
    return (
      <div className="table-responsive card" style={{ marginTop: "1rem" }}>
        <table className="table table-hover table-vcenter text-nowrap js-basic-example dataTable table-striped table_custom border-style spacing5">
          <thead>
            <tr>
              <th className="leavetable-head-index"></th>
              <th>Applied by</th>
              <th className="leavetable-head-leave">Leave type</th>
              <th className="leavetable-head-leave-range">Leaves</th>
              <th className="leavetable-head-days">Days</th>
              <th className="leavetable-head-reason">Reason</th>
              <th>Docs</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUnapprovedLeaves.map((vals, i) => {
              const {
                admin_name: name,
                leave_type: leaveType,
                reason_for_leave: reasonForLeave,
                _id: leaveID,
                forwarded_from: forwardedFrom,
                isApproved,
                isRejected,
                isForwarded,
                isWithdrawalApproved,
                leave_days: leaveCount,
                status: leaveStatus,
              } = vals;
              const showLeaves = (vals) => {
                const {
                  leave_days_list = [],
                  starting_date: leaveFrom,
                  ending_date: leaveTo,
                } = vals;

                if (leave_days_list.length < 1 && leaveFrom && leaveTo) {
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
                <tr key={i}>
                  <td className="leave-table-index">{i + 1}</td>
                  <td>{name}</td>
                  <td className="leave-table-leave">{leaveTypes[leaveType]}</td>
                  <td className="leave-table-leave-range">
                    {showLeaves(vals)}
                  </td>
                  <td className="leave-table-days">{leaveCount}</td>
                  <td className="leave-table-reason">{reasonForLeave}</td>
                  <td
                    style={{ cursor: "pointer", color: "#1672ff" }}
                    onClick={() => {
                      setshowDocForLeave(vals);
                      setopenDocModal(true);
                    }}
                  >
                    View
                  </td>
                  <td>
                    <Stack spacing={2} direction={"row"}>
                      {leaveStatus === "Pending_Withdrawal" ? (
                        <>
                          <Button
                            disabled={isRejected || isForwarded}
                            variant={
                              isWithdrawalApproved ? "contained" : "outlined"
                            }
                            size="small"
                            color="success"
                            name="ApproveWithdrawal"
                            onClick={(e) => {
                              isWithdrawalApproved
                                ? alert("Withdrawal already approved")
                                : handleAction(e, leaveID);
                            }}
                            endIcon={
                              <Tooltip title="This was an approved leave">
                                <InfoIcon />
                              </Tooltip>
                            }
                          >
                            {isWithdrawalApproved
                              ? "Approved"
                              : "Approve Withdrawal"}
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            disabled={isRejected || isForwarded}
                            variant={isApproved ? "contained" : "outlined"}
                            size="small"
                            color="success"
                            name="Approve"
                            onClick={(e) => {
                              isApproved
                                ? alert("Already approved")
                                : handleAction(e, leaveID);
                            }}
                          >
                            {isApproved ? "Approved" : "Approve"}
                          </Button>
                          <Button
                            disabled={isApproved || isForwarded}
                            variant={isRejected ? "contained" : "outlined"}
                            size="small"
                            color="error"
                            name="Reject"
                            onClick={(e) => {
                              isRejected
                                ? alert("Already rejected")
                                : handleAction(e, leaveID);
                            }}
                          >
                            {isRejected ? "Rejected" : "Reject"}
                          </Button>
                          <Button
                            disabled={isApproved || isRejected}
                            variant={isForwarded ? "contained" : "outlined"}
                            size="small"
                            name="Forward"
                            onClick={(e) => {
                              isForwarded
                                ? alert("Already forwarded")
                                : handleAction(e, leaveID);
                            }}
                            endIcon={
                              forwardedFrom.length ? (
                                <Tooltip title="This is a forwarded leave">
                                  <InfoIcon />
                                </Tooltip>
                              ) : (
                                <></>
                              )
                            }
                          >
                            {isForwarded ? "Forwarded" : "Forward"}
                          </Button>
                        </>
                      )}
                    </Stack>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  const renderDocModalContent = (leaveObj) => {
    const {
      leave_type: leaveType,
      starting_date: leaveFrom,
      ending_date: leaveTo,
      leave_days: leaveCount,
      reason_for_leave: reasonForLeave,
      application_link: mandDocLink,
      comment: leaveComment,
      other_document_link: otherDocLink,
      other_document_link_description: otherDocLinkDescription,
      status: currStatus,
      forwarded_from: forwardedFrom,
      current_approver: currentApprover,
    } = leaveObj;
    const showStatus = () => {
      if(currentApprover === faculty_id){
        return `Forwarded from ${forwardedFrom[forwardedFrom.length - 1]}`
      }
      return `Forwarded to ${forwardedFrom[forwardedFrom.length - 1]}`
    }
    return (
      <Stack spacing={2} direction={"column"}>
        {JSON.stringify(leaveObj)}
        <div>
          <span className="docModal">Leave type:</span>&nbsp;
          {leaveTypes[leaveType]}
        </div>
        <div>
          <span className="docModal">Dates:</span>&nbsp;
          {moment(leaveFrom).format("DD MMM YY")} -{" "}
          {moment(leaveTo).format("DD MMM YY")}
        </div>
        <div>
          <span className="docModal">Leave days count:</span>&nbsp;{leaveCount}
        </div>
        <div>
          <span className="docModal">Reason for leave:</span>&nbsp;
          {reasonForLeave}
        </div>
        <div>
          <span className="docModal">Current status:</span>&nbsp;{" "}
          {currStatus === "Forwarded"
            ? showStatus()
            : currStatus === "Pending_Withdrawal"
            ? "Withdraw approval pending"
            : currStatus}
        </div>
        {mandDocLink && (
          <div>
            <span className="docModal">Mandatory document link:</span>&nbsp;
            <a
              href={`${mandDocLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          </div>
        )}
        {leaveComment && (
          <div>
            <span className="docModal">Added comment:</span>&nbsp;{leaveComment}
          </div>
        )}
        {otherDocLink && (
          <div>
            <span className="docModal">Additional document link:</span>&nbsp;
            <a
              href={`${otherDocLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          </div>
        )}
        {otherDocLinkDescription && (
          <div>
            <span className="docModal">Other document description:</span>&nbsp;
            {otherDocLinkDescription}
          </div>
        )}
      </Stack>
    );
  };
  const handleDocModalClose = () => {
    setshowDocForLeave({});
    setopenDocModal(false);
  };
  const renderRejectModalView = () => {
    return (
      <Input
        placeholder="Enter here"
        fullWidth
        autoFocus
        id="rejectionRemark"
        defaultValue={rejectionRemark}
        onChange={(event) => setrejectionRemark(event.target.value)}
      />
    );
  };
  const renderForwardModalView = () => {
    let customClass = "";
    if (verifyApiCalled) {
      if (verificationSuccess) {
        customClass = "success";
      } else {
        customClass = "failed";
      }
    }
    return (
      <>
        <Stack spacing={3} direction={"row"}>
          <Input
            fullWidth
            autoFocus
            placeholder="Enter Manager's Id here"
            id="forwarded"
            defaultValue={forwardedID}
            onChange={(event) => {
              setisVerified(false);
              setforwardedID(event.target.value);
            }}
          />
          <LoadingButton
            loading={isVerifyingUser}
            variant="outlined"
            disabled={!forwardedID}
            onClick={() => dispatch(verifyUser(forwardedID, faculty_id))}
          >
            Verify
          </LoadingButton>
          <span className={`verify-status ${customClass} mt-2 ml-4`}>
            {customClass}
          </span>
        </Stack>
      </>
    );
  };
  return (
    <>
      {renderHeader()}
      <div className="section-body mt-4">
        <div className="container-fluid">{renderContent()}</div>
        <Modal
          open={openModal}
          onClose={() => handleDiscardRequest()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="div">
              {requestedAction} requested
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="subtitle1"
              component="dov"
            >
              {requestedAction === "Reject"
                ? "Please enter a valid remark for the rejection"
                : "Enter the collegeId of the person to forward this leave to"}
            </Typography>
            <hr />
            {requestedAction === "Reject"
              ? renderRejectModalView()
              : renderForwardModalView()}
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
                  if (requestedAction === "Reject") handleRejectRequest();
                  else handleForwardRequest();
                }}
              >
                Continue
              </Button>
              <Button
                variant="standard"
                size="small"
                onClick={() => handleDiscardRequest()}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Modal
          open={openDocModal}
          onClose={() => handleDocModalClose()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="modal-modal-title"
              variant="subtitle1"
              component="dov"
            >
              Find below the uploaded documents and added comments for this
              leave
            </Typography>
            <hr />
            {renderDocModalContent(showDocForLeave)}
            <Stack
              spacing={0}
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
                variant="standard"
                size="small"
                onClick={() => handleDocModalClose()}
              >
                Close
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    </>
  );
}



