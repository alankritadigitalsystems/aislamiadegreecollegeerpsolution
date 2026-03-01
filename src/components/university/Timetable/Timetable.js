import React, { Fragment, useEffect, useState } from "react";
import { getAllClasses, getAllSubjects } from "../../api/dashboardApi";
import TimetableCalendar from "./TimetableCalendar";
import { useSelector, useDispatch } from "react-redux";
import NoPermission from "../../common/NoPermission";
import { TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import TextField from "@mui/material/TextField";

export default function Timetable({ permissions = {}, isSuperAdmin }) {
  const dispatch = useDispatch();
  const getClasses = () => dispatch(getAllClasses());
  const getSubjects = () => dispatch(getAllSubjects());

  const state = useSelector((state) => state) || {};
  const [activeTab, setactiveTab] = useState(1);
  const { dashboardReducer: { allClasses, allSubjects } = {} } = state;

  useEffect(() => {
    getClasses();
    getSubjects();
  }, []);

  const renderHeader = () => {
    return (
      <Fragment>
        <div className="section-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="header-action">
                <h1 className="page-title">Timetable</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item">
                    <span>Amiruddaula Islamia Degree College</span>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Timetable
                  </li>
                </ol>
              </div>
              {/* <Nav tabs className="page-header-tab">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 1 })}
                    onClick={() => setactiveTab(1)}
                  >
                    Timetable
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 2 })}
                    onClick={() => setactiveTab(2)}
                  >
                    Edit static fields
                  </NavLink>
                </NavItem>
              </Nav> */}
            </div>
            {!isSuperAdmin && !permissions.create && (
              <div className="mt-2" style={{ color: "red" }}>
                *Note: You don &apos;t have permission to create/update timetable.
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  };
  const renderCalendarSection = () => {
    return (
      <>
        <TimetableCalendar
          classesList={allClasses}
          subjectsList={allSubjects}
          permissions={permissions}
          isSuperAdmin={isSuperAdmin}
        />
      </>
    );
  };

  const renderEditStaticFields = () => {
      return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Edit static fields for timetable</h3>
            </div>
            <div className="card-body">
                College Start time
                College End time
                Lunch Start time
                Lunch End time

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                      renderInput={(params) => (
                        <TextField {...params} style={{ width: "10rem" }} />
                      )}
                    //   value={val.start}
                      label="From"
                      name="startTime"
                      minTime={new Date(0, 0, 0, 8)}
                      maxTime={new Date(0, 0, 0, 18)}
                      onChange={(e) => {}}
                    />
                </LocalizationProvider>
            </div>
        </div>
      )
  }

  if (!isSuperAdmin && !permissions.read) {
    return <NoPermission />;
  }
  return (
    <>
      {renderHeader()}
      <div className="section-body mt-4">
        <div className="container-fluid">
            <TabContent activeTab={activeTab}>
                <TabPane tabId={1} className={classnames(["fade show"])}>
                    {renderCalendarSection()}
                </TabPane>
                {/* <TabPane tabId={2} className={classnames(["fade show"])}>
                    {renderEditStaticFields()}
                </TabPane> */}
            </TabContent>
        </div>
      </div>
    </>
  );
}



