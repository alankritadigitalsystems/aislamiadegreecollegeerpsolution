import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';
import { addSubject, getAllSubjects, createClass } from '../../api/dashboardApi';
import CreateClass from './CreateClass';
import NoPermission from '../../common/NoPermission';

class SubjectClass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 1,
			show: false,
			subject: '',
			displayStatus: true,
			timeOutSet: false,
			fee: 0
		};
	}

	componentDidUpdate() {
		const { addingSubject, subjectApiCalled } = this.props;
		const { displayStatus, timeOutSet } = this.state;
		if (!addingSubject && displayStatus && !timeOutSet && subjectApiCalled) {
			setTimeout(() => {
				this.setState({ displayStatus: false });
			}, 2000);
			this.setState({ timeOutSet: true });
		}
	}

	handleAddSubject = () => {
		const { userProfile = {}, addSubject } = this.props;
		const { _id, full_name: { first_name, last_name } = {} } = userProfile;
		const payload = {
			name: this.state.subject,
			created_by: _id,
			admin_name: `${first_name} ${last_name}`
		};
		const callback = () => this.setState({ subject: '', fee: 0 });
		this.setState({ displayStatus: true, timeOutSet: false });
		addSubject(payload, callback);
	}

	renderHeader = () => {
		const { activeTab } = this.state;
		const { permissions = {}, isSuperAdmin } = this.props;
		const selectedTab = activeTab === 1 ? 'Subject' : 'Class';

		return (
			<Fragment>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">Subject and Class</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><span>Amiruddaula Islamia Degree College</span></li>
									<li className="breadcrumb-item active" aria-current="page">{selectedTab}</li>
								</ol>
							</div>
							<Nav tabs className="page-header-tab">
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 1 })}
										onClick={() => this.setState({ activeTab: 1 })}
									>
										Add Subject
									</NavLink>
								</NavItem>
								<NavItem style={{ display: "block" }}>
									<NavLink
										className={classnames({ active: activeTab === 2 })}
										onClick={() => this.setState({ activeTab: 2 })}
									>
										Add Class
									</NavLink>
								</NavItem>
							</Nav>
						</div>
						{(!isSuperAdmin && !permissions.create) && <div className='mt-2' style={{ color: "red" }}>*Note: You don &apos; t have permission to create/update subject and class.</div>}
					</div>
				</div>
			</Fragment>
		);
	}

	renderSubjectSection = () => {
		const { subject = '', displayStatus, fee } = this.state;
		const { addingSubject = false, isAddSubjectSuccess, subjectApiCalled, isSuperAdmin, permissions = {} } = this.props;
		const status = isAddSubjectSuccess ? 'Success' : 'Failed';
		const color = isAddSubjectSuccess ? 'limegreen' : 'red';
		return (
			<Fragment>
				<TabPane tabId={1} className={classnames(['fade show'])}>
					<div className="card">
						<div className="card-header">
							<h3 className="card-title">Add Subject</h3>
							{(subjectApiCalled && displayStatus) && <div className='status' style={{ background: color }}>{status}</div>}
						</div>
						<form className="card-body">
							<div className="form-group row">
								<label className="col-md-3 col-form-label">Subject Name <span className="text-danger">*</span></label>
								<div className="col-md-7">
									<input type="text" className="form-control" value={subject} onChange={(e) => this.setState({ subject: e.target.value })} />
								</div>
							</div>
							<div className="form-group row">
								<label className="col-md-3 col-form-label">Subject Fee <span className="text-danger">*</span></label>
								<div className="col-md-7">
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text" id="basic-addon1">&#8377;</span>
										</div>
										<input type="number" class="form-control" value={fee} onChange={(e) => this.setState({ fee: e.target.value })} />
									</div>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-md-3 col-form-label"></label>
								<div className="col-md-7">
									<button
										className="mr-3 btn btn-primary"
										onClick={this.handleAddSubject}
										disabled={(!isSuperAdmin && !permissions.create) || !subject || !fee}
										type='button'
										style={{ width: "72px" }}
									>
										{addingSubject ? <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> : 'Submit'}
									</button>
									<button
										className="btn btn-outline-secondary"
										type='button'
										onClick={() => this.setState({ subject: '' })}
										disabled={addingSubject}
									>
										Discard
									</button>
								</div>
							</div>
						</form>
					</div>
				</TabPane>
			</Fragment>
		);
	}

	renderClassSection = () => {
		if (this.state.activeTab !== 2) return null;
		const { allSubjects, getAllSubjects, createClass, creatingClass, permissions = {}, isSuperAdmin, fetchingSubjects } = this.props;
		return (
			<CreateClass
				getAllSubjects={getAllSubjects}
				subjectList={allSubjects}
				createClass={createClass}
				creatingClass={creatingClass}
				permissions={permissions}
				isSuperAdmin={isSuperAdmin}
				fetchingSubjects={fetchingSubjects}
			/>
		);
	}

	render() {
		const { activeTab } = this.state
		const { permissions = {}, isSuperAdmin } = this.props;
		if (!isSuperAdmin && !permissions.read) {
			return <NoPermission />;
		}
		return (
			<>
				{this.renderHeader()}
				<div className="section-body mt-4">
					<div className="container-fluid">
						<TabContent activeTab={activeTab}>
							{this.renderSubjectSection()}
							{this.renderClassSection()}
						</TabContent>
					</div>
				</div>

			</>
		);
	}
}

const mapStateToProps = state => ({
	userProfile: state.authenticationReducer.userProfile,
	addingSubject: state.dashboardReducer.addingSubject,
	isAddSubjectSuccess: state.dashboardReducer.isAddSubjectSuccess,
	subjectApiCalled: state.dashboardReducer.subjectApiCalled,
	allSubjects: state.dashboardReducer.allSubjects,
	creatingClass: state.dashboardReducer.creatingClass,
	fetchingSubjects: state.dashboardReducer.fetchingSubjects
})

const mapDispatchToProps = dispatch => ({
	addSubject: (e, cb) => dispatch(addSubject(e, cb)),
	getAllSubjects: () => dispatch(getAllSubjects()),
	createClass: (e, cb) => dispatch(createClass(e, cb)),
	dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(SubjectClass);



