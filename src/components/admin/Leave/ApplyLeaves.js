import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LeaveCalendar from './LeaveCalendar';
import { getAllHolidays } from '../../api/dashboardApi';
import {fetchUserProfile} from '../../api/authenticationApi';
import { Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { createLeave } from "../../api/LeaveApi";
import moment from "moment";

const initialValues = {
	comment: '',
	application_link: '',
	reason_for_leave: '',
	other_document_link: '',
	other_document_link_description: '',
};

export default function ApplyLeaves() {
	const [selectedLeaveType, setLeaveType] = useState("Select");
	const [availableLeaves, setCount] = useState(0);
	const [actualLeaves, setActualLeaves] = useState(0);
	const [infiniteLeaves, setInfiniteLeaves] = useState(false);

	const [selectedDay, setSelectedDay] = useState([]);
	const [noOfDaysApplied, setDaysApplied] = useState(0);
	const [range, setRangeDates] = useState({ from: undefined, to: undefined });

	const [showError, setErrorDisplay] = useState(false);
	const [message, setMessage] = useState('');
	const [applySuccess, setStatus] = useState(false);

	const dispatch = useDispatch();
	const getHolidays = () => dispatch(getAllHolidays());
	const fetchProfile = (e) => dispatch(fetchUserProfile(e));
	const applyLeave = (e, cb, ecb) => dispatch(createLeave(e, cb, ecb));
	const { dashboardReducer = {}, authenticationReducer = {}, leaveReducer = {} } = useSelector(state => state);
	const { holidayList = [], fetchingHolidays } = dashboardReducer;
	const { userProfile: { _id, faculty_id, full_name = {}, reference_faculty, leavesList = [] } = {} } = authenticationReducer;
	const { applyingLeave } = leaveReducer;

	useEffect(() => {
		getHolidays();
		fetchProfile(_id);
	}, []);

	const validateSchema = Yup.object().shape({
		application_link: Yup.string().required("Document upload is required"),
		reason_for_leave: Yup.string().required('Leave Reason is required.')
	});

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validateSchema,
		onSubmit: () => handleSubmit()
	});

	const { values = {} } = formik;

	const onChangeType = (e) => {
		setLeaveType(e);
		setSelectedDay(undefined);
		setRangeDates({ from: undefined, to: undefined });
		setDaysApplied(0);
		const selected = leavesList.find((l) => l.leaveCode === e);
		if (selected) {
			setCount(selected.available_leave_count);
			setActualLeaves(selected.available_leave_count);
			setInfiniteLeaves(selected.infiniteLeaves);

			if (!selected.infiniteLeaves && selected.available_leave_count === 0) {
				setErrorDisplay(true);
			} else {
				setErrorDisplay(false);
			}
		}

	};

  const handleSubmit = () => {
    const {reason_for_leave, comment} = values || {};
    const payload = {
      created_by: faculty_id,
      admin_name: `${full_name.first_name} ${full_name.last_name}`,
      leave_days: noOfDaysApplied,
      leave_type: selectedLeaveType,
      application_link: 'https://www.google.com',
      reason_for_leave: reason_for_leave,
      current_approver: reference_faculty,
      comment: comment,
	  _id
    };
    
    if (range.from && range.to) {
      payload.starting_date = moment(range.from).format("YYYY-MM-DD");
      payload.ending_date = moment(range.to).format("YYYY-MM-DD");
    }
    applyLeave(payload, applyLeaveSuccessCallback, applyLeaveFailureCallback);
  };

	const applyLeaveSuccessCallback = () => {
		setRangeDates({ from: undefined, to: undefined });
		setSelectedDay(undefined);
		setCount(actualLeaves);
		setDaysApplied(0);
		setLeaveType('Select');
		formik.resetForm();

		setMessage('Leaves Applied!!');
		setStatus(true);
		setTimeout(() => {
			setMessage('');
		}, 3000);
	}

	const applyLeaveFailureCallback = (error) => {
		setMessage(error);
		setStatus(false);
		setTimeout(() => {
			setMessage('');
		}, 4000);
	}

	const renderHeader = () => {
		return (
			<Fragment>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">Leave Application</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item">
										<div>Amiruddaula Islamia Degree College</div>
									</li>
									<li className="breadcrumb-item active" aria-current="page">
										Apply leaves
									</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	};

	const renderForm = () => {
		const color = applySuccess ? 'limegreen' : 'red';
		return (
			<div className="row">
				<FormikProvider value={formik}>
					<Form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
						<div className="col-md-6 col-sm-6">
							<div className="form-group">
								<label>Reason For Leave</label>
								<span style={{ color: "red" }}>*</span>
								<Field
									name="reason_for_leave"
									className="form-control no-resize"
									placeholder="Reason..."
									type="text"
									as="textarea"
									rows="4"
									value={values.reason_for_leave}
									style={{ resize: "none" }}
								/>
							</div>
						</div>
						<div className="col-md-6 col-sm-6">
							<div className="form-group">
								<label>Comments</label>
								<Field
									name="comment"
									className="form-control no-resize"
									placeholder="Comments..."
									type="text"
									as="textarea"
									rows="4"
									value={values.comment}
									style={{ resize: "none" }}
								/>
							</div>
						</div>
						<div className="col-md-6 col-sm-6">
							<div className="form-group">
								<label htmlFor="inputFile">Upload Document (PDF Only)</label>
								{/* <span style={{color: "red"}}>*</span> */}
								<br />
								<input id="inputFile" type="file" accept=".pdf" />
								{/* <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> */}
								<button type="button" className="btn btn-outline-success btn-sm">Upload</button>
							</div>
						</div>
						<div className="col-md-6 col-sm-6">
							<div className="form-group">
								<label>Uploaded Document Link</label>
								<div style={{ color: "#ebebeb" }}>Upload document first...</div>
							</div>
						</div>
						<hr className="section-hr" />
						<div className="col-md-6 col-sm-6">
							<div className="form-group">
								<label htmlFor="inputOtherFile">Other Document (PDF Only)</label>
								<br />
								<input id="inputOtherFile" type="file" accept=".pdf" />
								{/* <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> */}
								<button type="button" className="btn btn-outline-success btn-sm">Upload</button>
							</div>
						</div>
						<div className="col-md-6 col-sm-6">
							<div className="form-group">
								<label>Other Document Link</label>
								<div style={{ color: "#ebebeb" }}>Upload document first...</div>
							</div>
						</div>
						<div className="col-md-6 col-sm-6">
							<div className="form-group">
								<label>Other Document Description</label>
								<Field
									name="other_document_link_description"
									className="form-control no-resize"
									placeholder="Description..."
									type="text"
									as="textarea"
									rows="4"
									value={values.other_document_link_description}
									style={{ resize: "none" }}
								/>
							</div>
						</div>
						<div className="col-md-12 col-sm-12">
							<button
								type="submit"
								className="btn btn-outline-primary btn-block"
								onClick={handleSubmit}
								disabled={!values.reason_for_leave || !(range.from && range.to) || applyingLeave}
							>
								{applyingLeave ? <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> : 'Apply'}
							</button>
						</div>
						{message && (
							<div className="col-md-6 col-sm-6 mt-3">
								<div className="leave-status status ml-0" style={{backgroundColor: color}}>{message}</div>
							</div>
						)}
					</Form>
				</FormikProvider>
			</div>
		);
	}

	const renderContent = () => {
		const color = applySuccess ? 'limegreen' : 'red';
		return (
			<Fragment>
				<div className="card-header">
					<h3 className="card-title">Apply for leaves</h3>
					{fetchingHolidays && <span className="ml-3"><i className="fa fa-circle-o-notch fa-spin fa-fw mr-1"></i>Fetching Holidays...</span>}
					{message && <div className="leave-status status" style={{backgroundColor: color}}>{message}</div>}
				</div>
				<div className="card-body">
					<div className="col-md-6 col-sm-12">
						<div className="form-group">
							<label htmlFor="leaveType">Select Leave Type</label>
							<div className="form-inline">
								<select className="form-control" style={{ width: "50%" }} id="leaveType" value={selectedLeaveType} onChange={(e) => onChangeType(e.target.value)}>
									<option key="Select" value="Select">Select</option>
									{leavesList.map((leave) => {
										return <option key={leave.leaveCode} value={leave.leaveCode}>{leave.leaveType}</option>
									})}
								</select>
								{selectedLeaveType !== 'Select' && <div className="ml-4">Available Leaves: {infiniteLeaves ? 'Unlimited' : availableLeaves}</div>}
							</div>
						</div>
					</div>
					{(showError && !infiniteLeaves) && <div style={{ color: "red" }}>You don &apos; t have enough leaves.</div>}
					{renderLeaveCalendar()}
					<br />
					{selectedLeaveType !== 'Select' && renderForm()}
				</div>
			</Fragment>
		);
	};

	const renderLeaveCalendar = () => {
		if (selectedLeaveType === 'Select') return null;

		return (
			<LeaveCalendar
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
				availableLeaves={availableLeaves}
				setCount={setCount}
				selectedLeaveType={selectedLeaveType}
				range={range}
				setRangeDates={setRangeDates}
				holidayList={holidayList}
				setDaysApplied={setDaysApplied}
				actualLeaves={actualLeaves}
				setErrorDisplay={setErrorDisplay}
				showError={showError}
				infiniteLeaves={infiniteLeaves}
			/>
		);
	}

	return (
		<Fragment>
			{renderHeader()}
			<div className="section-body mt-4">
				<div className="container-fluid">
					<div className="card">
						{renderContent()}
					</div>
				</div>
			</div>
		</Fragment>
	);
}



