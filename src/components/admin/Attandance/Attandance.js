import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import moment from 'moment';
import classnames from "classnames";
import { getAllFaculty, createAttendance, getAllHolidays, updateAttendance } from '../../api/dashboardApi';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Attandance = ({ permissions = {}, isSuperAdmin }) => {
	const dispatch = useDispatch();
	const getFaculty = (e) => dispatch(getAllFaculty(e));
	const createFacultyAttendance = (e, data) => dispatch(createAttendance(e, data));
	const fetchHolidays = () => dispatch(getAllHolidays());
	const updateFacultyAttendance = (e, data, ecb) => dispatch(updateAttendance(e, data, ecb));
	const state = useSelector((state) => state);
	const { dashboardReducer: { allFaculty = [], facultyLoaing, holidayList = [] } = {}, authenticationReducer = {} } = state;
	const { userProfile: { full_name: { first_name = '', last_name = '' } = {} } = {}, _id = '' } = authenticationReducer;

	const d = moment(new Date()).format('yyyy-MM-DD');
	const [selectedDate, setSelectedDate] = useState(d);

	useEffect(() => {
		getFaculty(selectedDate);
		fetchHolidays();
	}, []);

	const markAttendance = (faculty = {}, isPresent) => {
		const payload = {
			isPresent,
			id: faculty.id,
			created_by: _id,
			admin_name: `${first_name} ${last_name}`,
			date: selectedDate
		};
		if (faculty.isAttendanceMarked) {
			delete payload.admin_name;
			payload._id = faculty.attendanceId;
			const errorCallback = () => toast.error("Unable to update Attendance. Please try again.", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
			});
			updateFacultyAttendance(payload, allFaculty, errorCallback);
		} else {
			createFacultyAttendance(payload, allFaculty);
		}
	};

	const onDateCange = (date) => {
		const newDate = moment(date).format('yyyy-MM-DD');
		setSelectedDate(newDate);
		getFaculty(newDate);
	};

	const disableDates = (date) => {
		const inDate = moment(date).format('yyyy-MM-DD');
		const dateTime = holidayList.map((holiday) => moment(holiday).format('yyyy-MM-DD'));
		return date.getDay() === 0 || date.getDay() === 6 || dateTime.includes(inDate);
	};

	if (!isSuperAdmin && !permissions.read) {
		return null;
	}

	const notAlowed = disableDates(new Date(selectedDate));

	return (
		<Fragment>
			<div className="section-body">
				<div className="container-fluid">
					<div className="d-flex justify-content-between align-items-center mb-3">
						<div className="header-action">
							<h1 className="page-title">Attendance</h1>
							<ol className="breadcrumb page-breadcrumb">
								<li className="breadcrumb-item"><span>Amiruddaula Islamia Degree College</span></li>
								<li className="breadcrumb-item active" aria-current="page">Attendance</li>
							</ol>
						</div>
					</div>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DesktopDatePicker
							label="Select Date"
							inputFormat="yyyy/MM/dd"
							value={selectedDate}
							onChange={(date) => onDateCange(date)}
							maxDate={new Date()}
							renderInput={(params) => (
								<TextField
									{...params}
									sx={{ width: "20%", outline: "none" }}
									helperText={null}
								/>
							)}
							shouldDisableDate={disableDates}
						/>
					</LocalizationProvider>
					{(!isSuperAdmin && !permissions.update) && <div className="mt-3" style={{ color: "red" }}>* Note: You don &apos;t have permission to update attendance</div>}
					{(!isSuperAdmin && !permissions.create) && <div className="mt-3" style={{ color: "red" }}>* Note: You don &apos;t have permission to mark new attendance</div>}
					{notAlowed && <div className="mt-3">Note: Attendance on holiday not allowed.</div>}
				</div>
			</div>

			<div className="section-body mt-4">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="table-responsive card">
									<table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
										<thead>
											<tr>
												<th>S. No.</th>
												<th>Name</th>
												<th></th>
												<th>Department</th>
												<th>Email</th>
												<th>Phone</th>
												<th>Attendance</th>
											</tr>
										</thead>
										<tbody>
											{!facultyLoaing && allFaculty.map((faculty, i) => {
												const { isAttendanceMarked, isPresent, profilePic = '' } = faculty;
												const isUpdateAllowed = isSuperAdmin || (permissions.update && isAttendanceMarked);
												const isCreateAllowed = isSuperAdmin || (permissions.create && !isAttendanceMarked);
												const disable = !isUpdateAllowed && !isCreateAllowed;
												return (
													<tr key={i}>
														<td>{i + 1}</td>
														<td className="w60">
															<img className="avatar" src={profilePic} alt="" />
														</td>
														<td><span className="font-16">{faculty.name}</span></td>
														<td>{faculty.department}</td>
														<td>{faculty.email_id}</td>
														<td>{faculty.mobile_number}</td>
														<td>
															<button
																type="button"
																className={classnames(["btn btn-outline-danger mr-3", { "bg-red": isAttendanceMarked && !isPresent }])}
																onClick={(isAttendanceMarked && !isPresent) ? () => { } : () => markAttendance(faculty, false)}
																disabled={notAlowed || (!isSuperAdmin && isAttendanceMarked && !permissions.update) || (!isSuperAdmin && !isAttendanceMarked && !permissions.create)}
															>
																A
															</button>
															<button
																type="button"
																className={classnames(["btn btn-outline-success", { "bg-green": isAttendanceMarked && isPresent }])}
																onClick={(isAttendanceMarked && isPresent) ? () => { } : () => markAttendance(faculty, true)}
																disabled={notAlowed || (!isSuperAdmin && isAttendanceMarked && !permissions.update) || (!isSuperAdmin && !isAttendanceMarked && !permissions.create)}
															>
																P
															</button>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
									{facultyLoaing && <div style={{ textAlign: "center" }}><i className="fa fa-circle-o-notch fa-spin fa-fw mr-2"></i>Loading Faculty...</div>}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</Fragment>
	);
}

export default Attandance;



