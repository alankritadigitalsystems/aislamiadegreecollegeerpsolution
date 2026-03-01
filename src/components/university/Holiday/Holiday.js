import React, { Component } from "react";
import Fullcalender from "../../common/fullcalender";
import "react-datepicker/dist/react-datepicker.css";
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from "classnames";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import {
  holidayCalendarUserInputDispatcher,
  holidayCalendarListDispatcher,
  resetHolidayCalendarDispatcher,
} from "../../../actions/holidayCalendarAction";
import { Box } from "@mui/system";
import { Modal, Typography } from "@mui/material";
import {
  createCalendar,
  fetchCalendarByYear,
  deleteCalendar,
} from "../../api/calendarAPI";
import moment from "moment";
import NoPermission from "../../common/NoPermission";

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
class Holiday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      activeTab: 1,
      isCardRemove: false,
      isCollapsed: false,
      year: new Date(),
      month: 0,
      localHolidayList: [],
      warningMsgModalOpen: false,
      isSubmitTrigger: false,
      isDiscardChanges: false,
      warningModalTitle: "",
      warningModalSubTitle: "",
      isYearChangeDisabled: false,
      previousCalendarExists: false,
      _id: "",
      errorMessage: "",
    };
  }
  componentDidMount() {
    this.handleYearChange(new Date());
  }
  convertEventsPropToCalendarInputs = () => {
    let finalArray = [];
    const { holiday_list = {} } = this.props; // pick the holiday list from the redux store
    if (Object.keys(holiday_list).length > 0) {
      for (var keys in holiday_list) {
        // keys== January, February, March ....
        finalArray = [
          ...finalArray,
          holiday_list[keys]?.map((objs) => {
            return {
              title: objs[Object.keys(objs)[0]],
              start: Object.keys(objs)[0],
              className: "bg-success",
            };
          }),
        ];
      }
    }
    let data = [];
    finalArray.forEach((hold) => {
      data = [...data, ...hold];
    });
    this.setState({ ...this.state, localHolidayList: data });
  };
  handleModalOpen = (
    typeOfEvent = "discard_changes" || "submit_changes" || "delete_calendar"
  ) => {
    if (typeOfEvent === "submit_changes") {
      this.setState({
        ...this.state,
        warningMsgModalOpen: true,
        isSubmitTrigger: true,
        warningModalTitle: "Are you sure you want to submit?",
        warningModalSubTitle:
          "Please verify the values you entered are correct for all months.",
      });
    } else if (typeOfEvent === "discard_changes") {
      this.setState({
        ...this.state,
        warningMsgModalOpen: true,
        isDiscardChanges: true,
        warningModalTitle: "Are you sure you want to discard all the changes?",
        warningModalSubTitle:
          "All the holiday events added so far will be removed.",
      });
    } else if (typeOfEvent === "delete_calendar") {
      this.setState({
        ...this.state,
        warningMsgModalOpen: true,
        previousCalendarExists: true,
        warningModalTitle: "Are you sure you want to delete this calendar?",
        warningModalSubTitle:
          "All the holiday events will be removed permanently.",
      });
    }
  };
  handleModalClose = () => {
    this.setState({
      ...this.state,
      warningMsgModalOpen: false,
      isSubmitTrigger: false,
      isDiscardChanges: false,
      warningModalTitle: "",
      warningModalSubTitle: "",
    });
  };
  handleHolidayEvents = (e) => {
    const { holidayCalendarUserInputDispatcher, userProfile, _id } = this.props;
    const { first_name, last_name } = userProfile.full_name;
    setTimeout(() => {
      this.setState({ ...this.state, isYearChangeDisabled: true });
    }, 0);
    holidayCalendarUserInputDispatcher({
      created_by: _id,
      creator_name: `${first_name} ${last_name}`,
      year: this.state.year.getFullYear(),
    });
    this.handleHolidayList(e);
  };
  handleHolidayList = (param) => {
    const { holidayCalendarListDispatcher, holiday_list } = this.props;
    var existingObjKeys = Object.keys(holiday_list);
    var newObjKeys = Object.keys(param);
    let tempHolidayList = { ...holiday_list };

    if (existingObjKeys.includes(newObjKeys[0])) {
      tempHolidayList[newObjKeys[0]].push(param[newObjKeys[0]][0]);
      holidayCalendarListDispatcher(tempHolidayList);
    } else {
      if (existingObjKeys.length === 0) {
        holidayCalendarListDispatcher(param);
      } else {
        tempHolidayList[newObjKeys[0]] = param[newObjKeys[0]];
        holidayCalendarListDispatcher(tempHolidayList);
      }
    }
    this.convertEventsPropToCalendarInputs();
    // this.setState({ ...this.state, localHolidayList: holiday_list });
  };
  handleDiscardCalendarChanges = () => {
    const { resetHolidayCalendarDispatcher } = this.props;
    resetHolidayCalendarDispatcher();
    this.setState({
      ...this.state,
      localHolidayList: [],
    });
    setTimeout(() => {
      this.setState({ ...this.state, isYearChangeDisabled: false, month: 0 });
      this.convertEventsPropToCalendarInputs();
    }, 0);
  };
  handleContinueAfterWarning = () => {
    if (this.state.isSubmitTrigger) {
      const { fullCalendarRequestParam, createCalendar } = this.props;
      if (
        fullCalendarRequestParam.created_by === "" &&
        fullCalendarRequestParam.creator_name === "" &&
        fullCalendarRequestParam.year === ""
      ) {
        alert(
          "Submiting empty calendar doesn't seems to be a good idea. Please add some holiday events."
        );
        this.setState({ ...this.state, warningMsgModalOpen: false });
        return true;
      } else {
        createCalendar(fullCalendarRequestParam, this.createCalendarCallback);
      }
    } else if (this.state.isDiscardChanges) {
      this.handleDiscardCalendarChanges();
    } else if (this.state.previousCalendarExists) {
      this.handleDeleteCalendar();
    }
    this.handleModalClose();
  };
  createCalendarCallback = (response) => {
    if (response.message === "saved") {
      alert("Calendar saved successfully");
      this.setState({
        ...this.state,
        isYearChangeDisabled: false,
        month: 0,
        _id: response.id,
      });
      this.handleYearChange(this.state.year);
    } else {
      alert("Calendar not saved");
    }
  };
  handleYearChange = (newValue) => {
    const { fetchCalendarByYear } = this.props;
    const requestParam = {
      year: newValue.getFullYear(),
    };
    fetchCalendarByYear(requestParam, this.getCalendarByYearCallback);
  };
  getCalendarByYearCallback = (response) => {
    const { holidayCalendarUserInputDispatcher } = this.props;
    const { permissions = {}, isSuperAdmin } = this.props;
    if (response.UpdateStatus === false) {
      this.setState({
        ...this.state,
        errorMessage:
          permissions.create || permissions.update
            ? "No previous calendar found for this year. Please add some holiday events."
            : "No previous calendar found for this year.",
      });
      this.handleDiscardCalendarChanges();
      this.setState({
        ...this.state,
        previousCalendarExists: false,
      });
    } else {
      this.setState({
        ...this.state,
        previousCalendarExists: true,
        _id: response._id,
        errorMessage: "",
      });
      holidayCalendarUserInputDispatcher(response);
      this.convertEventsPropToCalendarInputs();
      // alert("Previous calendar found for this year.");
    }
  };
  handleDeleteCalendar = () => {
    const { deleteCalendar } = this.props;
    deleteCalendar({ _id: this.state._id }, this.deleteCalendarCallback);
  };
  deleteCalendarCallback = (response) => {
    if (response.DeleteStatus) {
      alert("Calendar deleted successfully");
      this.handleDiscardCalendarChanges();
      this.setState({ ...this.state, previousCalendarExists: false });
    }
  };

  render() {
    const { activeTab } = this.state;
    const { permissions = {}, isSuperAdmin } = this.props;
    if (!isSuperAdmin && !permissions.read) {
      return <NoPermission />;
    }
    return (
      <>
        <div className="section-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="header-action">
                <h1 className="page-title">Holiday</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item">
                    <a >Amiruddaula Islamia Degree College</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Holiday
                  </li>
                </ol>
              </div>
              <Nav tabs className="page-header-tab">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 1 })}
                    onClick={() => this.setState({ activeTab: 1 })}
                  >
                    Calendar
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 2 })}
                    onClick={() => this.setState({ activeTab: 2 })}
                  >
                    List View
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            {!isSuperAdmin && !permissions.create && (
              <div className="mt-2" style={{ color: "red" }}>
                *Note: You don &apos; t have permission to create/update holiday
                calendar.
              </div>
            )}
          </div>
        </div>
        <div className="section-body mt-4">
          <div className="container-fluid">
            <TabContent activeTab={activeTab}>
              <TabPane tabId={1} className={classnames(["fade show"])}>
                <div className="card">
                  <div className="card-body">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3} direction={"row"}>
                        <DesktopDatePicker
                          disabled={this.state.isYearChangeDisabled}
                          views={["year"]}
                          label="Select Year"
                          value={this.state.year}
                          maxDate={new Date()}
                          onChange={(newValue) => {
                            this.setState({
                              ...this.state,
                              year: newValue,
                              month: 0,
                            });
                            this.handleYearChange(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{ width: "15%", outline: "none" }}
                              helperText={null}
                            />
                          )}
                        />
                        <Stack
                          spacing={2}
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
                          <Tooltip title="Previous month" arrow placement="top">
                            <a
                              
                              onClick={() =>
                                this.state.month !== 0 &&
                                this.setState({
                                  ...this.state,
                                  month: this.state.month - 1,
                                })
                              }
                            >
                              <span
                                class="iconify"
                                data-icon="bi:arrow-left-square-fill"
                                data-width="30"
                              ></span>
                            </a>
                          </Tooltip>
                          <Tooltip title="Next month" arrow placement="top">
                            <a
                              
                              onClick={() =>
                                this.state.month !== 11 &&
                                this.setState({
                                  ...this.state,
                                  month: this.state.month + 1,
                                })
                              }
                            >
                              <span
                                class="iconify"
                                data-icon="bi:arrow-right-square-fill"
                                data-width="30"
                              ></span>
                            </a>
                          </Tooltip>
                        </Stack>
                        <Stack
                          spacing={3}
                          direction={"row"}
                          style={{
                            width: "max-content",
                            margin: "0rem 0rem 0rem auto",
                            display: "flex",
                            textAlign: "center",
                            height: "min-content",
                          }}
                        >
                          {(JSON.parse(permissions.create) ||
                            JSON.parse(permissions.update)) &&
                          !this.state.previousCalendarExists ? (
                            <>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() =>
                                  this.handleModalOpen("submit_changes")
                                }
                              >
                                Submit changes
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() =>
                                  this.handleModalOpen("discard_changes")
                                }
                              >
                                Discard changes
                              </Button>
                            </>
                          ) : (
                            <>
                              {JSON.parse(permissions.delete) &&
                                this.state.previousCalendarExists && (
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() =>
                                      this.handleModalOpen("delete_calendar")
                                    }
                                  >
                                    Delete this calendar
                                  </Button>
                                )}
                            </>
                          )}
                        </Stack>
                      </Stack>
                    </LocalizationProvider>
                    {this.state.errorMessage && (
                      <div className="mt-2" style={{ color: "red" }}>
                        *{this.state.errorMessage}
                      </div>
                    )}
                    <Fullcalender
                      permissions={permissions}
                      isSuperAdmin={isSuperAdmin}
                      selectedYear={this.state.year}
                      selectedMonth={this.state.month}
                      handleHolidayEvents={this.handleHolidayEvents}
                      previousCalendarExists={this.state.previousCalendarExists}
                      handleExistingCalendarDayClick={(strMsg) => {
                        this.setState({
                          ...this.state,
                          errorMessage: strMsg
                            ? permissions.create && permissions.delete
                              ? `${strMsg}, delete this to make changes!`
                              : permissions.create && !permissions.delete
                              ? `${strMsg}, get this calendar deleted to make changes!`
                              : permissions.update && !permissions.delete
                              ? `${strMsg}, get this calendar deleted to make changes!`
                              : permissions.delete
                              ? `${strMsg}, you can only delete this calendar!`
                              : `${strMsg}`
                            : null,
                        });
                      }}
                    />
                    {/* ============= Warning modal ============= */}
                    <Modal
                      open={this.state.warningMsgModalOpen}
                      onClose={this.handleModalClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalStyle}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="div"
                        >
                          {this.state.warningModalTitle}
                        </Typography>
                        <Typography
                          id="modal-modal-title"
                          variant="subtitle1"
                          component="dov"
                        >
                          {this.state.warningModalSubTitle}
                        </Typography>
                        <hr />
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
                            onClick={() => this.handleContinueAfterWarning()}
                          >
                            Continue
                          </Button>
                          <Button
                            variant="standard"
                            size="small"
                            onClick={() => {
                              setTimeout(() => {
                                this.handleModalClose();
                              }, 0);
                            }}
                          >
                            Cancel
                          </Button>
                        </Stack>
                      </Box>
                    </Modal>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId={2} className={classnames(["fade show"])}>
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover table-vcenter text-nowrap js-basic-example dataTable table-striped table_custom border-style spacing5">
                        <thead>
                          <tr>
                            <th>S. No.</th>
                            <th>Title</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        {this.state.localHolidayList.map((item, index) => (
                          <tbody key={index}>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.title}</td>
                              <td>
                                {moment(item.start).format("DD-MMMM-YYYY")}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  faculty_id: state.authenticationReducer.faculty_id,
  userName: state.authenticationReducer.userName,
  holiday_list: state.holidayCalendarReducer.holiday_list,
  _id: state.authenticationReducer._id,
  userProfile: state.authenticationReducer.userProfile,
  fullCalendarRequestParam: state.holidayCalendarReducer,
});

const mapDispatchToProps = (dispatch) => ({
  holidayCalendarUserInputDispatcher: (e) =>
    dispatch(holidayCalendarUserInputDispatcher(e)),
  holidayCalendarListDispatcher: (e) =>
    dispatch(holidayCalendarListDispatcher(e)),
  resetHolidayCalendarDispatcher: (e) =>
    dispatch(resetHolidayCalendarDispatcher(e)),
  createCalendar: (e, cb) => dispatch(createCalendar(e, cb)),
  fetchCalendarByYear: (e, cb) => dispatch(fetchCalendarByYear(e, cb)),
  deleteCalendar: (e, cb) => dispatch(deleteCalendar(e, cb)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Holiday);
