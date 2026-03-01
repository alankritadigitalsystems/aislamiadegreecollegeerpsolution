import mongoose from "mongoose";
import LeaveModel from"../models/leave"
import FacultyModel from"../models/faculty"
import leaveService from"./service/leave"
import crud from"../middlewares/crud"

module.exports = {
  async getLeaveByIDAndDates(req, res, modelObj) {
    // let result = await getLeavesInRange(req, modelObj, res);
    console.log("calling service");

    // TODO: always returning success, change to get promise from the method or set error in response there and see how that can be used here in controller.
    leaveService
      .getLeavesInRange(
        req.body.id,
        req.body.starting_date,
        req.body.ending_date,
        modelObj
      )
      .then((result) => {
        console.log(" result fetched");
        if (result.length == 0) return res.status(201).json([]);
        else return res.status(201).json(result);
      })
      .catch((err) => {
        console.log("service error");
        // console.log(err);
        return res.status(500).json({
          error: "Error in fetching leaves",
          dump: err,
        });
      });
  },

  async getUnApprovedLeaves(req, res, modelObj) {
    console.log(req.query);
    modelObj
      .find({
        $or: [
          { current_approver: req.query.id, status: "Created" },
          { current_approver: req.query.id, status: "Forwarded" },
          { current_approver: req.query.id, status: "Pending_Withdrawal" },
        ],
      })
      .then((result) => {
        if (result == null)
          return res
            .status(403)
            .json({ UpdateStatus: false, err: "No leaves found" });
        else return res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },

  async createLeaveForFaculty(req, res, modelObj) {
    // let result = await getLeavesInRange(req, modelObj, res);
    console.log("calling service");

    const faculty = await this.getfaculty(req.body.created_by);

    leaveService
      .getLeavesInRange(
        req.body.created_by,
        req.body.starting_date,
        req.body.ending_date,
        modelObj
      )
      .then((result) => {
        console.log(" result fetched");

        // leaves exist in given range
        if (result.length > 0) {
          return res.status(400).json({
            error: "Leave already exists in given range",
          });
        }

        // TODO: check if user can take this kind of leave based on conditions
        if (!leaveService.checkLeaveConditions(req, faculty)) {
          return res.status(400).json({
            error: "Leave conditions not met",
          });
        }

        // console.log(req)
        var leave = new LeaveModel(req.body);
        // crud.createEntry(req, res, modelObj)
        leave
          .save()
          .then((result) => {
            console.log("saved");
            // deduct leave
            leaveService
              .deductLeave(req.body, faculty)
              .then((result) => {
                // console.log(result);
                return res.status(201).json({ message: "leave created" });
              })
              .catch((err) => {
                // console.log(err);
                return res
                  .status(500)
                  .json({ message: "error updating leave count" });
              });
          })
          .catch((err) => {
            // console.log(err);
            return res.status(500).json({
              error: "error creating leave",
            });
          });
      })
      .catch((err) => {
        console.log("service error");
        // console.log(err);
        return res.status(500).json({
          error: "Error verifying leave eligibility.",
          dump: err,
        });
      });
  },

  async approveLeave(req, res, modelObj) {
    modelObj
      .findOne({ _id: req.body.leave_id })
      .then((leaveToBeApproved) => {
        // console.log(leaveToBeApproved);
        // check if approver is user
        if (leaveToBeApproved.current_approver != req.body.user_id) {
          return res.status(400).json({ err: "User Cannot Approve Leave" });
        }

        // check if leave is already approved
        if (leaveToBeApproved.status == "Approved") {
          return res.status(400).json({ err: "Leave Already Approved" });
        }

        // check if leave is already rejected
        if (leaveToBeApproved.status == "Rejected") {
          return res.status(400).json({ err: "Leave Already Rejected" });
        }

        // check if leave is already withdrawn
        if (leaveToBeApproved.status == "Withdrawn") {
          return res.status(400).json({ err: "Leave Already Withdrawn" });
        }

        // check if leave is pending withdrawal
        if (leaveToBeApproved.status == "Pending_Withdrawal") {
          return res.status(400).json({ err: "Leave is Pending Withdrawal" });
        }

        leaveToBeApproved.status = "Approved";
        leaveToBeApproved
          .save()
          .then((result) => {
            // console.log(result);
            return res.status(201).json({ message: "Leave Approved" });
          })
          .catch((err) => {
            // console.log(err);
            return res.status(500).json({
              error: "Error approving leave",
            });
          });
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({
          error: "Error fetching leave",
        });
      });
  },

  async rejectLeave(req, res, modelObj) {
    modelObj
      .findOne({ _id: req.body.leave_id })
      .then((leaveToBeRejected) => {
        // console.log(leaveToBeApproved);
        // check if approver is user
        if (leaveToBeRejected.current_approver != req.body.user_id) {
          return res.status(400).json({ err: "User Cannot Reject Leave" });
        }

        // check if leave is already approved
        if (leaveToBeRejected.status == "Approved") {
          return res.status(400).json({ err: "Leave Already Approved" });
        }

        // check if leave is already rejected
        if (leaveToBeRejected.status == "Rejected") {
          return res.status(400).json({ err: "Leave Already Rejected" });
        }

        // check if leave is pending withdrawal
        if (leaveToBeRejected.status == "Pending_Withdrawal") {
          return res.status(400).json({ err: "Leave is Pending Withdrawal" });
        }

        // check if leave is already withdrawn
        if (leaveToBeRejected.status == "Withdrawn") {
          return res.status(400).json({ err: "Leave Already Withdrawn" });
        }

        this.getfaculty(leaveToBeRejected.created_by)
          .then((faculty) => {
            leaveToBeRejected.status = "Rejected";
            leaveToBeRejected.reason_for_action = req.body.reason_for_action;
            leaveToBeRejected
              .save()
              .then((result) => {
                // console.log(result);
                // restore leaves
                leaveService
                  .restoreLeaveCount(faculty, leaveToBeRejected)
                  .then((result) => {
                    return res.status(201).json({ message: "Leave Rejected" });
                  })
                  .catch((err) => {
                    // console.log(err);
                    // TODO: we need to try to restore leaves
                    return res.status(201).json({
                      message: "Error restoring leave count",
                    });
                  });
              })
              .catch((err) => {
                // console.log(err);
                return res.status(500).json({
                  error: "Error rejecting leave",
                });
              });
          })
          .catch((err) => {
            // console.log(err);
            return res.status(500).json({
              error: "Error fetching faculty",
            });
          });
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({
          error: "Error fetching leave",
        });
      });
  },

  async forwardLeave(req, res, modelObj) {
    modelObj
      .findOne({ _id: req.body.leave_id })
      .then((leaveToBeForwarded) => {
        // console.log(leaveToBeApproved);
        // check if approver is user
        if (leaveToBeForwarded.current_approver != req.body.user_id) {
          return res.status(400).json({ err: "User Cannot Forward Leave" });
        }

        // check if leave is already approved
        if (leaveToBeForwarded.status == "Approved") {
          return res.status(400).json({ err: "Leave Already Approved" });
        }

        // check if leave is already rejected
        if (leaveToBeForwarded.status == "Rejected") {
          return res.status(400).json({ err: "Leave Already Rejected" });
        }

        // check if leave is pending withdrawal
        if (leaveToBeForwarded.status == "Pending_Withdrawal") {
          return res.status(400).json({ err: "Leave is Pending Withdrawal" });
        }

        // check if leave is already withdrawn
        if (leaveToBeForwarded.status == "Withdrawn") {
          return res.status(400).json({ err: "Leave Already Withdrawn" });
        }

        leaveToBeForwarded.forwarded_from.push(
          leaveToBeForwarded.current_approver
        );
        leaveToBeForwarded.current_approver = req.body.next_approver;
        leaveToBeForwarded.status = "Forwarded";
        leaveToBeForwarded
          .save()
          .then((result) => {
            // console.log(result);
            return res
              .status(201)
              .json({ message: "Leave Forwarded Successfully" });
          })
          .catch((err) => {
            // console.log(err);
            return res.status(500).json({
              error: "Error forwarding leave",
            });
          });
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({
          error: "Error fetching leave",
        });
      });
  },

  // TODO: restore leaves of the type that have been withdrawn
  async withdrawLeave(req, res, modelObj) {
    modelObj
      .findOne({ _id: req.body.leave_id })
      .then((leaveToRequestWithdrawal) => {
        // console.log(leaveToBeApproved);
        // check if approver is user
        if (leaveToRequestWithdrawal.created_by != req.body.user_id) {
          return res
            .status(400)
            .json({ err: "User Cannot Request Leave Withdrawal" });
        }

        // check if leave is pending withdrawal
        if (leaveToRequestWithdrawal.status == "Pending_Withdrawal") {
          return res.status(400).json({ err: "Leave is Pending Withdrawal" });
        }

        // check if leave is already withdrawn
        if (leaveToRequestWithdrawal.status == "Withdrawn") {
          return res.status(400).json({ err: "Leave Already Withdrawn" });
        }

        // check if leave is already rejected
        if (leaveToRequestWithdrawal.status == "Rejected") {
          return res.status(400).json({ err: "Leave Already Rejected" });
        }

        leaveToRequestWithdrawal.reason_for_action = req.body.reason_for_action;
        // check if leave is already approved
        if (leaveToRequestWithdrawal.status == "Approved") {
          leaveToRequestWithdrawal.status = "Pending_Withdrawal";

          leaveToRequestWithdrawal
            .save()
            .then((result) => {
              // console.log(result);
              return res
                .status(201)
                .json({ message: "Leave Withdrawal Requested" });
            })
            .catch((err) => {
              // console.log(err);
              return res.status(500).json({
                error: "Error withdrawing leave",
              });
            });
        }
        // check if leave is created or forwarded
        else if (
          leaveToRequestWithdrawal.status == "Created" ||
          leaveToRequestWithdrawal.status == "Forwarded"
        ) {
          this.getfaculty(leaveToRequestWithdrawal.created_by)
            .then((faculty) => {
              leaveToRequestWithdrawal.status = "Withdrawn";

              leaveToRequestWithdrawal
                .save()
                .then((result) => {
                  // console.log(result);
                  // restore leaves
                  leaveService
                    .restoreLeaveCount(
                      faculty,
                      leaveToRequestWithdrawal
                    )
                    .then((result) => {
                      return res
                        .status(201)
                        .json({ message: "Leave Withdrawn" });
                    })
                    .catch((err) => {
                      // console.log(err);
                      // TODO: we need to try to restore leaves
                      return res.status(201).json({
                        message: "Error restoring leave count",
                      });
                    });
                })
                .catch((err) => {
                  // console.log(err);
                  return res.status(500).json({
                    error: "Error withdrawing leave",
                  });
                });
            })
            .catch((err) => {
              // console.log(err);
              return res.status(500).json({
                error: "Error fetching faculty",
              });
            });
        }
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({
          error: "Error fetching leave",
        });
      });
  },

  async approveLeaveWithdrawal(req, res, modelObj) {
    modelObj
      .findOne({ _id: req.body.leave_id })
      .then((leaveToApproveWithdrawal) => {
        // console.log(leaveToBeApproved);
        // check if approver is user
        if (leaveToApproveWithdrawal.current_approver != req.body.user_id) {
          return res
            .status(400)
            .json({ err: "User Cannot Approve Leave Withdrawal" });
        }

        // check if leave is already withdrawn
        if (leaveToApproveWithdrawal.status == "Withdrawn") {
          return res.status(400).json({ err: "Leave Already Withdrawn" });
        }

        // check if leave is already approved
        if (leaveToApproveWithdrawal.status != "Pending_Withdrawal") {
          return res.status(400).json({ err: "Action cannot be performed" });
        }

        this.getfaculty(leaveToApproveWithdrawal.created_by)
          .then((faculty) => {
            leaveToApproveWithdrawal.status = "Withdrawn";
            leaveToApproveWithdrawal
              .save()
              .then((result) => {
                // console.log(result);

                // restore leaves
                leaveService
                  .restoreLeaveCount(faculty, leaveToApproveWithdrawal)
                  .then((result) => {
                    return res.status(201).json({ message: "Leave Withdrawn" });
                  })
                  .catch((err) => {
                    // console.log(err);
                    // TODO: we need to try to restore leaves
                    return res.status(201).json({
                      message: "Error restoring leave count",
                    });
                  });
              })
              .catch((err) => {
                // console.log(err);
                return res.status(500).json({
                  error: "Error withdrawing leave",
                });
              });
          })
          .catch((err) => {
            // console.log(err);
            return res.status(500).json({
              error: "Error fetching faculty",
            });
          });
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({
          error: "Error fetching leave",
        });
      });
  },

  async getfaculty(faculty_id) {
    var id = faculty_id;
    // console.log(id);
    return await FacultyModel.findOne({ faculty_id: id }).then((result) => {
      // console.log(result);
      return result;
    });
  },

  async creditAnnualLeave(req, res) {
    this.getfaculty(req.body.faculty_id).then((faculty) => {
      // console.log(faculty);
      leaveService
        .creditAnnualLeave(faculty)
        .then((result) => {
          // console.log(result);
          return res
            .status(201)
            .json({ message: "credited", faculty_id: result.faculty_id });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ message: "error", err: err });
        });
    });
  },
};
