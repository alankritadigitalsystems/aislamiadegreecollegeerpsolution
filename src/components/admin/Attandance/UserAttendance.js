import React, { Fragment, useState } from 'react';
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux';
import { getUserAttendance } from '../../api/dashboardApi';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import '@fullcalendar/daygrid/index.cjs';
import '@fullcalendar/timegrid/index.cjs';

const UserAttendance = () => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [defaultDate, setDefaultDate] = useState(new Date());

    const dispatch = useDispatch();
    const fetchUserAttendance = (e, callback) => dispatch(getUserAttendance(e, callback));

    const state = useSelector((state) => state);
    const {dashboardReducer = {}, authenticationReducer = {}} = state || {};
    const {fetchingAttendance, userAttendance = []} = dashboardReducer;
    const {userProfile: {_id} = {}} = authenticationReducer;
    const handleSubmit = () => {
        const callback = () => setDefaultDate(fromDate);
        const payload = {
            id: _id,
            startingDate: fromDate,
            endDate: toDate
        }
        fetchUserAttendance(payload, callback);
    }

    const onNextClick = () => {
        const newToDate = new Date(toDate);
        const newDefaultDate = new Date(defaultDate);
        const maxMonth = newToDate.getMonth();
        const selectedMonth = newDefaultDate.getMonth();

        if (selectedMonth === maxMonth) return;

        newDefaultDate.setMonth(selectedMonth + 1);
        setDefaultDate(newDefaultDate);
    };

    const onPrevClick = () => {
        const newFromDate = new Date(fromDate);
        const newDefaultDate = new Date(defaultDate);
        const minMonth = newFromDate.getMonth();
        const selectedMonth = newDefaultDate.getMonth();

        if (selectedMonth === minMonth) return;

        newDefaultDate.setMonth(selectedMonth - 1);
        setDefaultDate(newDefaultDate);
    };

    return (
        <Fragment>
            <div className="section-body">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="header-action">
                            <h1 className="page-title">My Attendance</h1>
                            <ol className="breadcrumb page-breadcrumb">
                                <li className="breadcrumb-item"><span>Amiruddaula Islamia Degree College</span></li>
                                <li className="breadcrumb-item active" aria-current="page">My Attendance</li>
                            </ol>
                        </div>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="From"
                            inputFormat="dd MMM yyyy"
                            value={fromDate}
                            onChange={(date) => setFromDate(date)}
                            maxDate={new Date()}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    sx={{ width: "16%", outline: "none", marginRight: "1rem" }}
                                    helperText={null}
                                />
                            )}
                        />
                        <DesktopDatePicker
                            label="To"
                            inputFormat="dd MMM yyyy"
                            value={toDate}
                            onChange={(date) => setToDate(date)}
                            maxDate={new Date()}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    sx={{ width: "16%", outline: "none", marginRight: "2rem" }}
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
                            <Tooltip title="Previous month" arrow placement="top">
                                <a
                                    href="#"
                                    onClick={() => onPrevClick()}
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
                                    href="#"
                                    onClick={() => onNextClick()}
                                >
                                    <span
                                        class="iconify"
                                        data-icon="bi:arrow-right-square-fill"
                                        data-width="30"
                                    ></span>
                                </a>
                            </Tooltip>
                            <Button variant="contained" size="long" onClick={handleSubmit} disabled={fetchingAttendance}>
                                {fetchingAttendance ? <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> : 'Submit'}
                            </Button>
                        </Stack>
                    </LocalizationProvider>
                </div>
            </div>
            <div className="section-body mt-4">
                <div className="container-fluid">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: "",
                            center: "title",
                            right: ""
                        }}
                        initialDate={defaultDate}
                        events={userAttendance}
                        displayEventTime={false}
                        editable={false}
                        selectable={false}
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default UserAttendance;
