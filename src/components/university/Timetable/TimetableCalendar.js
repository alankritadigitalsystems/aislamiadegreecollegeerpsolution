import React, { Component, Fragment, useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
import Popup from "../../Shared/Popup";
import moment from "moment";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import WeeklyTimetable from "./WeeklyTimetable";
import FormHelperText from "@mui/material/FormHelperText";
import {
  timetableUserInputDispatcher,
  timetableCreateDispatcher,
  updateCreateDispatcher,
  timetableListDispatcher,
  resetTimetableDispatcher,
  timetableAddRowDispatcher,
  timetableRemoveRowDispatcher,
} from "../../../actions/timetableAction";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  getTimetableByClassId,
  createTimetable,
  updateTimetable,
  deleteTimetable,
} from "../../api/dashboardApi";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";

export default function TimetableCalendar({
  classesList = [],
  subjectsList = [],
  permissions = {},
  isSuperAdmin,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state) || {};
  const { authenticationReducer: { userProfile } = {} } = state;
  const { timetableReducer: { schedule, creatingTimetable } = [] } = state;
  const { _id, full_name } = userProfile;
  const { first_name, last_name } = full_name;
  const [openEventPopup, setopenEventPopup] = useState(false);
  const [showTimetable, setshowTimetable] = useState(false);
  const [isCreating, setisCreating] = useState(false);
  const [calendarAlreadyExists, setcalendarAlreadyExists] = useState(false);
  const [timeTableForDay, settimeTableForDay] = useState("");
  const [currSelectedView, setcurrSelectedView] = useState("");
  const [selectedClass, setselectedClass] = useState({});
  const [noCalendarFound, setnoCalendarFound] = useState(false);
  const [foundExistingSemesters, setfoundExistingSemester] = useState([]);
  const getWeekDay = () => `${moment(currSelectedView.dateStr).format("dddd")}`;
  const getSubtitleForStartDate = () =>
    `This class starts from ${moment(selectedClass[0]?.startDate).format(
      "ddd DD-MMM-YYYY"
    )}.`;
  const getSubtitleForExistingTimetable = () =>
    `NOTE: Timetable already exists for the above selected semester, consider adding timetable for other semesters.`;
  const handleSelectedClass = (e) => {
    const filteredClass = classesList.filter((_) => _.value === e.target.value);
    setselectedClass(filteredClass);
    checkIfTimetableAlreadyExists(filteredClass[0].value);
    dispatch(resetTimetableDispatcher());
    dispatch(
      timetableUserInputDispatcher({
        class: filteredClass[0].value,
        created_by: _id,
        admin_name: `${first_name} ${last_name}`,
      })
    );
  };
  const handleSelectedSemester = (e) => {
    if (calendarAlreadyExists) {
      const prevSelectedClass = selectedClass[0].value;
      dispatch(resetTimetableDispatcher());
      dispatch(
        timetableUserInputDispatcher({
          class: prevSelectedClass,
          created_by: _id,
          admin_name: `${first_name} ${last_name}`,
        })
      );
      setshowTimetable(false);
    }
    dispatch(timetableUserInputDispatcher({ semester: e.target.value }));
  };
  const checkIfTimetableAlreadyExists = (e) => {
    const response = getTimetableByClassId(e);
    response.then((res) => {
      if (res.err === "id not found") {
        setshowTimetable(false);
        setcalendarAlreadyExists(false);
        setnoCalendarFound(true);
        return true;
      }
      setcalendarAlreadyExists(true);
      setnoCalendarFound(false);
      dispatch(timetableUserInputDispatcher(res));
      if(!foundExistingSemesters.includes(res.semester)){
        const tmp = [...foundExistingSemesters];
        tmp.push(res.semester);
        setfoundExistingSemester(tmp);
      }
      setshowTimetable(true);
    });
  };
  const daysInputView = () => {
    return (
      <>
        <Typography
          variant="subtitle1"
          gutterBottom
          component="div"
          sx={{ mt: 1 }}
        >
          Prepare timetable for all:
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            name="Monday"
            onClick={(e) => handleEventPopup(e.target.name)}
          >
            Monday
          </Button>
          <Button
            variant="outlined"
            name="Tuesday"
            onClick={(e) => handleEventPopup(e.target.name)}
          >
            Tuesday
          </Button>
          <Button
            variant="outlined"
            name="Wednesday"
            onClick={(e) => handleEventPopup(e.target.name)}
          >
            Wednesday
          </Button>
          <Button
            variant="outlined"
            name="Thursday"
            onClick={(e) => handleEventPopup(e.target.name)}
          >
            Thursday
          </Button>
          <Button
            variant="outlined"
            name="Friday"
            onClick={(e) => handleEventPopup(e.target.name)}
          >
            Friday
          </Button>
        </Stack>
      </>
    );
  };
  const handleEventPopup = (targetDay) => {
    settimeTableForDay(targetDay);
    setopenEventPopup(true);
  };
  const renderPopupContent = () => {
    return (
      <div className="popup-content">
        <div className="form-group">
          Events will be auto saved once you type.
          {schedule[timeTableForDay].map((val, index) => {
            return (
              <div key={`${index}`}>
                <Stack
                  spacing={3}
                  direction={"row"}
                  style={{
                    width: "max-content",
                    margin: "auto",
                    marginTop: "1.5rem",
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ marginRight: "1rem" }}>{index + 1}.</div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      renderInput={(params) => (
                        <TextField {...params} style={{ width: "10rem" }} />
                      )}
                      value={val.start}
                      label="From"
                      name="startTime"
                      minTime={new Date(0, 0, 0, 8)}
                      maxTime={new Date(0, 0, 0, 18)}
                      onChange={(e) => {
                        handleStartTimeChange(e, index);
                      }}
                    />
                    <TimePicker
                      renderInput={(params) => (
                        <TextField
                          helperText={
                            val.end < val.start
                              ? "class can't over even before starting"
                              : ""
                          }
                          {...params}
                          style={{ width: "10rem" }}
                        />
                      )}
                      value={val.end}
                      label="To"
                      name="endTime"
                      minTime={new Date(0, 0, 0, 8)}
                      maxTime={new Date(0, 0, 0, 18)}
                      onChange={(e) => {
                        handleEndTimeChange(e, index);
                      }}
                      error
                      helperText="abcd"
                    />
                  </LocalizationProvider>
                  <InputLabel id="subject_label">Subject</InputLabel>
                  <Select
                    style={{ width: "14rem" }}
                    labelId="subject_label"
                    id="subject_label"
                    label="Subject"
                    value={val.title}
                    name="subjectName"
                    onChange={(e) => handleSubjectChange(e, index)}
                  >
                    <MenuItem disabled>Subjects</MenuItem>
                    {subjectsList.map((subject, index) => {
                      return (
                        <MenuItem
                          key={`${subject.value}_${index}`}
                          value={subject.label}
                          name="subjectName"
                        >
                          {subject.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <div style={{ display: "grid" }}>
                    {schedule[timeTableForDay].length === index + 1 && (
                      <>
                        <i
                          className="fa fa-plus plus-icon"
                          aria-hidden="true"
                          onClick={() => {
                            dispatch(
                              timetableAddRowDispatcher(
                                schedule,
                                timeTableForDay
                              )
                            );
                          }}
                        ></i>
                      </>
                    )}
                    {schedule[timeTableForDay].length === index + 1 &&
                      schedule[timeTableForDay].length !== 1 && (
                        <i
                          className="fa fa-minus minus-icon"
                          aria-hidden="true"
                          onClick={() => {
                            dispatch(
                              timetableRemoveRowDispatcher(
                                schedule,
                                timeTableForDay
                              )
                            );
                          }}
                        ></i>
                      )}
                  </div>
                </Stack>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const handleStartTimeChange = (e, index) => {
    dispatch(
      timetableCreateDispatcher(
        schedule,
        timeTableForDay,
        e,
        index,
        "startTime"
      )
    );
  };
  const handleEndTimeChange = (e, index) => {
    dispatch(
      timetableCreateDispatcher(schedule, timeTableForDay, e, index, "endTime")
    );
  };
  const handleSubjectChange = (e, index) => {
    setshowTimetable(true);
    dispatch(
      timetableCreateDispatcher(
        schedule,
        timeTableForDay,
        e.target.value,
        index,
        "subject"
      )
    );
  };

  const oldTimetableWithValues = () => {
    var existingObjKeys = Object.keys(schedule);
    return (
      <>
        <Paper style={{ width: "100%", height: "30rem", marginTop: "2rem", overflowX: "auto" }}>
          <Table style={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell align="right">Sessions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {existingObjKeys.map((indx,index) => (
                <Fragment key={index}>
                  {schedule[indx] && (
                    <TableRow>
                      <TableCell rowSpan={schedule[indx].length + 1}>
                        {indx}
                      </TableCell>
                    </TableRow>
                  )}
                  {typeof schedule[indx] === "object" &&
                    schedule[indx].map((values,index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {values.title && values.start && values.end
                            ? `${values.title}: ( ${moment(values.start).format(
                                "HH:mm"
                              )} - ${moment(values.end).format("HH:mm")} )`
                            : "NA"}
                        </TableCell>
                      </TableRow>
                    ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <div className="button-section pt-2">
          {calendarAlreadyExists && (
            <button
              type="button"
              className="btn btn-secondary mr-3"
              onClick={() => handleTimetableDelete()}
            >
              Delete this timetable
            </button>
          )}
          <button
            type="button"
            className="btn btn-info mr-3"
            onClick={() => handleSaveRequest()}
          >
            {calendarAlreadyExists ? "Update all" : "Save all"}
            {isCreating && (
              <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>
            )}
          </button>
        </div>
      </>
    );
  };

  const betterTimetableWithValues = () => {
    return (
      <>
        <Paper style={{ width: "100%", height: "30rem", marginTop: "2rem", overflowX: "auto" }}>
          <WeeklyTimetable
            schedule={schedule}
            startTimeKey="08"
            endTimeKey="18"
            timeSteps="30"
            lunchStartTime="12:00"
            lunchEndTime="13:00"
          />
        </Paper>
        <div className="button-section pt-2">
          {calendarAlreadyExists && permissions.delete && (
            <button
              type="button"
              className="btn btn-secondary mr-3"
              onClick={() => handleTimetableDelete()}
            >
              Delete this timetable
            </button>
          )}
          {(permissions.update || permissions.create) && (
            <button
              type="button"
              className="btn btn-info mr-3"
              onClick={() => handleSaveRequest()}
            >
              {calendarAlreadyExists ? "Update all" : "Save all"}
              {isCreating && (
                <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>
              )}
            </button>
          )}
        </div>
      </>
    );
  };

  const allFieldsFilledInTimetable = () => {
    const { created_by, semester, admin_name, schedule } =
      state.timetableReducer;
    if (created_by && semester && admin_name && selectedClass[0].value)
      return true;
    return false;
  };
  const handleSaveRequest = () => {
    if (allFieldsFilledInTimetable()) {
      setisCreating(true);
      if (calendarAlreadyExists) {
        dispatch(
          updateTimetable(state.timetableReducer, updateTimetableCallback)
        );
      } else {
        dispatch(
          createTimetable(state.timetableReducer, createTimetableCallback)
        );
      }
    } else {
      notifyFailure("Please select all values and create timetable to save.");
    }
  };
  const createTimetableCallback = () => {
    setisCreating(false);
    notifySuccess("Timetable created successfully");
    checkIfTimetableAlreadyExists(selectedClass[0].value);
  };
  const updateTimetableCallback = () => {
    setisCreating(false);
    notifySuccess("Timetable updated successfully");
  };
  const handleTimetableDelete = () => {
    dispatch(
      deleteTimetable(state.timetableReducer._id, deleteTimetableCallback)
    );
  };
  const deleteTimetableCallback = () => {
    setshowTimetable(false);
    setcalendarAlreadyExists(false);
    dispatch(resetTimetableDispatcher());
    notifySuccess("Timetable deleted successfully");
  };

  const notifySuccess = (msg) => toast.success(`${msg}`);
  const notifyFailure = (msg) => toast.error(`${msg}`);

  return (
    <Fragment>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Add Timetable</h3>
        </div>
        <div className="card-body">
          <div className="form-group row">
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <label>Select class</label>
                <select
                  as="select"
                  id="selected_class"
                  name="selected_class"
                  className="form-control"
                  value={state.timetableReducer.class}
                  onChange={(e) => handleSelectedClass(e)}
                >
                  <option value="" name="" disabled>
                    Choose
                  </option>
                  {classesList.length > 0 &&
                    classesList.map((item, index) => {
                      const { value, cName, dept } = item;
                      return (
                        <option
                          key={`${index}_${value}`}
                          value={value}
                          name="selected_class"
                        >{`${cName} ${dept}`}</option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <label>Select semester</label>
                <select
                  as="select"
                  id="selected_semester"
                  name="selected_semester"
                  className="form-control"
                  value={state.timetableReducer.semester}
                  onChange={(e) => handleSelectedSemester(e)}
                >
                  <option value="" name="" disabled>
                    Choose
                  </option>
                  {selectedClass.length > 0 &&
                    [
                      ...Array(Number(selectedClass[0].totalSemesters)).keys(),
                    ].map((item, index) => {
                      return (
                        <option
                          value={item + 1}
                          key={`${item}${index}`}
                          name="selected_semester"
                        >
                          {item + 1}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
          {selectedClass[0]?.startDate && (
            <div>{getSubtitleForStartDate()}</div>
          )}
          {calendarAlreadyExists ? (
            <div style={{ color: "red" }}>
              {!permissions.create &&
                !permissions.update &&
                !permissions.delete &&
                `NOTE: Timetable already exists for selected semester(s): ${foundExistingSemesters.map((e)=> e).join(',')}.`}
              {(permissions.create || permissions.update) &&
                `NOTE: Timetable already exists for selected semester(s): ${foundExistingSemesters.map((e)=> e).join(',')}, consider adding timetable for other semesters.`}
              {permissions.delete &&
                !permissions.create &&
                !permissions.update &&
                `NOTE: Timetable already exists for selected semester(s): ${foundExistingSemesters.map((e)=> e).join(',')}, you're permitted to only delete any specific timetable.`}
            </div>
          ) : (
            <div style={{ color: "red" }}>
              {noCalendarFound && "No timetable found for this class"}
            </div>
          )}

          {(permissions.create || permissions.update) && daysInputView()}
          {openEventPopup && (
            <Popup
              comingFrom="timetable"
              title={`Timetable for all ${timeTableForDay}`}
              onCloseClick={() => setopenEventPopup(false)}
              content={renderPopupContent()}
            />
          )}
          {showTimetable && betterTimetableWithValues()}
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
