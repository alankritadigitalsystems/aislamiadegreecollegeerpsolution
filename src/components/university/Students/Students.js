import React, { Component } from 'react';
import Profilecomponent from '../../common/profilecomponent';
import SweetAlert from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';
import Dropzone from '../../common/DropzoneExample';

export default class Students extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 1,
			show: false
		};
	}
	render() {
		const { activeTab } = this.state
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">Students</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a >Amiruddaula Islamia Degree College</a></li>
									<li className="breadcrumb-item active" aria-current="page">Students</li>
								</ol>
							</div>
							<Nav tabs className="page-header-tab">
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 1 })}
										onClick={() => this.setState({ activeTab: 1 })}
									>
										List View
                   				</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 2 })}
										onClick={() => this.setState({ activeTab: 2 })}
									>
										Profile
    			               </NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 3 })}
										onClick={() => this.setState({ activeTab: 3 })}
									>
										Add
    			               </NavLink>
								</NavItem>
							</Nav>

						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container-fluid">
						<TabContent activeTab={activeTab}>
							<TabPane tabId={1} className={classnames(['fade show'])}>
								<div className="card">
									<div className="card-body">
										<div className="row">
											<div className="col-lg-2 col-md-4 col-sm-6">
												<div className="input-group">
													<input type="text" className="form-control" placeholder="Roll No." />
												</div>
											</div>
											<div className="col-lg-2 col-md-4 col-sm-6">
												<div className="input-group">
													<input type="text" className="form-control" placeholder="Name" />
												</div>
											</div>
											<div className="col-lg-4 col-md-4 col-sm-6">
												<div className="input-group">
													<input type="text" className="form-control" placeholder="Department" />
												</div>
											</div>
											<div className="col-lg-2 col-md-4 col-sm-6">
												<div className="input-group">
													<DatePicker
														placeholderText="Admission Date"
														className="form-control"
													/>
												</div>
											</div>
											<div className="col-lg-2 col-md-4 col-sm-6">
												<a  className="btn btn-sm btn-primary btn-block" title="">Search</a>
											</div>
										</div>
									</div>
								</div>
								<div className="table-responsive card">
									<table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
										<thead>
											<tr>
												<th>Roll No.</th>
												<th>Name</th>
												<th></th>
												<th>Department</th>
												<th>Email</th>
												<th>Phone</th>
												<th>Admission Date</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>A25</td>
												<td className="w60">
													<img className="avatar" src="../assets/images/xs/avatar1.jpg" alt="" />
												</td>
												<td><span className="font-16">Ken Smith</span></td>
												<td>Science</td>
												<td>ken@gmail.com</td>
												<td>(417) 646-7483</td>
												<td>04 Jan, 2019</td>
												<td>
													<button type="button" className="btn btn-icon btn-sm" title="View"><i className="fa fa-eye"></i></button>
													<button type="button" className="btn btn-icon btn-sm" title="Edit"><i className="fa fa-edit"></i></button>
<button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm">
  <i className="fa fa-trash-o text-danger"></i>
</button>
												</td>
											</tr>
											<tr>
												<td>A26</td>
												<td className="w60">
													<img className="avatar" src="../assets/images/xs/avatar2.jpg" alt="" />
												</td>
												<td><span className="font-16">Gerald K Smith</span></td>
												<td>M.C.A.</td>
												<td>Gerald@gmail.com</td>
												<td>(154) 646-2486</td>
												<td>04 Jan, 2019</td>
												<td>
													<button type="button" className="btn btn-icon btn-sm" title="View"><i className="fa fa-eye"></i></button>
													<button type="button" className="btn btn-icon btn-sm" title="Edit"><i className="fa fa-edit"></i></button>
<button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm">
  <i className="fa fa-trash-o text-danger"></i>
</button>
												</td>
											</tr>
											<tr>
												<td>A25</td>
												<td className="w60">
													<img className="avatar" src="../assets/images/xs/avatar3.jpg" alt="" />
												</td>
												<td><span className="font-16">Ken Smith</span></td>
												<td>Mechanical</td>
												<td>ken@gmail.com</td>
												<td>(417) 646-8377</td>
												<td>04 Jan, 2019</td>
												<td>
													<button type="button" className="btn btn-icon btn-sm" title="View"><i className="fa fa-eye"></i></button>
													<button type="button" className="btn btn-icon btn-sm" title="Edit"><i className="fa fa-edit"></i></button>
<button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm">
  <i className="fa fa-trash-o text-danger"></i>
</button>
												</td>
											</tr>
											<tr>
												<td>A27</td>
												<td className="w60">
													<img className="avatar" src="../assets/images/xs/avatar4.jpg" alt="" />
												</td>
												<td><span className="font-16">Alice A Smith</span></td>
												<td>M.B.B.S.</td>
												<td>Patricia@gmail.com</td>
												<td>(753) 646-4931</td>
												<td>04 Jan, 2019</td>
												<td>
													<button type="button" className="btn btn-icon btn-sm" title="View"><i className="fa fa-eye"></i></button>
													<button type="button" className="btn btn-icon btn-sm" title="Edit"><i className="fa fa-edit"></i></button>
<button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm">
  <i className="fa fa-trash-o text-danger"></i>
</button>
												</td>
											</tr>
											<tr>
												<td>A17</td>
												<td className="w60">
													<img className="avatar" src="../assets/images/xs/avatar5.jpg" alt="" />
												</td>
												<td><span className="font-16">Ken Smith</span></td>
												<td>Arts</td>
												<td>ken@gmail.com</td>
												<td>(417) 646-7642</td>
												<td>04 Jan, 2019</td>
												<td>
													<button type="button" className="btn btn-icon btn-sm" title="View"><i className="fa fa-eye"></i></button>
													<button type="button" className="btn btn-icon btn-sm" title="Edit"><i className="fa fa-edit"></i></button>
<button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm">
  <i className="fa fa-trash-o text-danger"></i>
</button>
												</td>
											</tr>
											<tr>
												<td>A11</td>
												<td className="w60">
													<img className="avatar" src="../assets/images/xs/avatar6.jpg" alt="" />
												</td>
												<td><span className="font-16">Corrine M Johnson</span></td>
												<td>Mechanical</td>
												<td>Gladys@gmail.com</td>
												<td>(349) 646-8377</td>
												<td>04 Jan, 2019</td>
												<td>
													<button type="button" className="btn btn-icon btn-sm" title="View"><i className="fa fa-eye"></i></button>
													<button type="button" className="btn btn-icon btn-sm" title="Edit"><i className="fa fa-edit"></i></button>
<button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm">
  <i className="fa fa-trash-o text-danger"></i>
</button>
												</td>
											</tr>
											<tr>
												<td>A12</td>
												<td className="w60">
													<img className="avatar" src="../assets/images/xs/avatar7.jpg" alt="" />
												</td>
												<td><span className="font-16">Alan Johnson</span></td>
												<td>Music</td>
												<td>ken@gmail.com</td>
												<td>(648) 646-8523</td>
												<td>04 Jan, 2019</td>
												<td>
													<button type="button" className="btn btn-icon btn-sm" title="View"><i className="fa fa-eye"></i></button>
													<button type="button" className="btn btn-icon btn-sm" title="Edit"><i className="fa fa-edit"></i></button>
<button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm">
  <i className="fa fa-trash-o text-danger"></i>
</button>
												</td>
											</tr>
											<tr>
												<td>A23</td>
												<td className="w60">
													<img className="avatar" src="../assets/images/xs/avatar8.jpg" alt="" />
												</td>
												<td><span className="font-16">John Smith</span></td>
												<td>Civil</td>
												<td>Corrine@gmail.com</td>
												<td>(417) 646-7845</td>
												<td>04 Jan, 2019</td>
												<td>
													<button type="button" className="btn btn-icon btn-sm" title="View"><i className="fa fa-eye"></i></button>
													<button type="button" className="btn btn-icon btn-sm" title="Edit"><i className="fa fa-edit"></i></button>
<button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm">
  <i className="fa fa-trash-o text-danger"></i>
</button>
												</td>
											</tr>
										</tbody>
									</table>
									<SweetAlert
										show={this.state.show}
										title="Are you sure?"
										text="You will not be able to recover this imaginary file!"
										icon="warning"
										showCancelButton={true}
										confirmButtonColor="#dc3545"
										confirmButtonText="Yes, delete it!"
										closeOnConfirm={false}
										onConfirm={() => this.setState({ show: false })}
									/>
								</div>
							</TabPane>
							<TabPane tabId={2} className={classnames(['fade show'])}>
								<Profilecomponent />
							</TabPane>
							<TabPane tabId={3} className={classnames(['fade show'])}>
								<div className="row clearfix">
									<div className="col-lg-8 col-md-12 col-sm-12">
										<div className="card">
											<div className="card-header">
												<h3 className="card-title">Basic Information</h3>
												<div className="card-options ">
													<a  className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a>
													<a  className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a>
												</div>
											</div>
											<form className="card-body">
												<div className="form-group row">
													<label className="col-md-3 col-form-label">First Name <span className="text-danger">*</span></label>
													<div className="col-md-9">
														<input type="text" className="form-control" placeholder="Enter First name" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Last Name <span className="text-danger">*</span></label>
													<div className="col-md-9">
														<input type="text" className="form-control" placeholder="Enter Last name" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Roll No <span className="text-danger">*</span></label>
													<div className="col-md-9">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Email</label>
													<div className="col-md-9">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Registration Date <span className="text-danger">*</span></label>
													<div className="col-md-9">
														<DatePicker
															className="form-control"
														/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Class <span className="text-danger">*</span></label>
													<div className="col-md-9">
														<select className="form-control input-height" name="department">
															<option value="">Select...</option>
															<option value="Category 1">Computer</option>
															<option value="Category 2">Mechanical</option>
															<option value="Category 3">Mathematics</option>
															<option value="Category 3">Commerce</option>
														</select>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Gender <span className="text-danger">*</span></label>
													<div className="col-md-9">
														<select className="form-control input-height" name="gender">
															<option value="">Select...</option>
															<option value="Category 1">Male</option>
															<option value="Category 2">Female</option>
														</select>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Mobile No. <span className="text-danger">*</span></label>
													<div className="col-md-9">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Parents Name <span className="text-danger">*</span></label>
													<div className="col-md-9">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Parents Mobile No. <span className="text-danger">*</span></label>
													<div className="col-md-9">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Date Of Birth  <span className="text-danger">*</span></label>
													<div className="col-md-9">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Address <span className="text-danger">*</span></label>
													<div className="col-md-9">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Profile Picture</label>
													<div className="col-md-9">
														<Dropzone />
														<small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It&apos;s a bit lighter and easily wraps to a new line.</small>
													</div>
												</div>
											</form>
										</div>
									</div>
									<div className="col-lg-4 col-md-12 col-sm-12">
										<div className="card">
											<div className="card-header">
												<h3 className="card-title">Account Information</h3>
												<div className="card-options ">
													<a  className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a>
													<a  className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a>
												</div>
											</div>
											<div className="card-body">
												<div className="row clearfix">
													<div className="col-sm-12">
														<div className="form-group">
															<label>User Name</label>
															<input type="text" className="form-control" />
														</div>
													</div>
													<div className="col-md-6 col-sm-12">
														<div className="form-group">
															<label>Password</label>
															<input type="text" className="form-control" />
														</div>
													</div>
													<div className="col-md-6 col-sm-12">
														<div className="form-group">
															<label>Confirm Password</label>
															<input type="text" className="form-control" />
														</div>
													</div>
													<div className="col-sm-12">
														<button type="submit" className="mr-1 btn btn-primary">Submit</button>
														<button type="submit" className="btn btn-outline-secondary">Cancel</button>
													</div>
												</div>
											</div>
										</div>
										<div className="card">
											<div className="card-header">
												<h3 className="card-title">Account Information</h3>
												<div className="card-options ">
													<a  className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a>
													<a  className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a>
												</div>
											</div>
											<div className="card-body">
												<div className="form-group">
													<label>Facebook</label>
													<input type="text" className="form-control" />
												</div>
												<div className="form-group">
													<label>Twitter</label>
													<input type="text" className="form-control" />
												</div>
												<div className="form-group">
													<label>LinkedIN</label>
													<input type="text" className="form-control" />
												</div>
												<div className="form-group">
													<label>Behance</label>
													<input type="text" className="form-control" />
												</div>
												<div className="form-group">
													<label>dribbble</label>
													<input type="text" className="form-control" />
												</div>
												<button type="submit" className="mr-1 btn btn-primary">Submit</button>
												<button type="submit" className="btn btn-outline-secondary">Cancel</button>
											</div>
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



