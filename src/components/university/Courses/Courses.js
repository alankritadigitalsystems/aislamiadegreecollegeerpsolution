import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';

export default class Courses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 1,
			isCardRemove: false,
			isCollapsed: false
		};
	}
	render() {
		const { activeTab, isCardRemove, isCollapsed } = this.state
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">Courses</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a >Amiruddaula Islamia Degree College</a></li>
									<li className="breadcrumb-item active" aria-current="page">Courses</li>
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
										Add
    			               </NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 3 })}
										onClick={() => this.setState({ activeTab: 3 })}
									>
										Add Bootstrap Style
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
								<div className="row row-deck">
									<div className="col-xl-4 col-lg-4 col-md-6">
										<div className="card">
											<a ><img className="card-img-top" src="../assets/images/gallery/1.jpg" alt="" /></a>
											<div className="card-body d-flex flex-column">
												<h5>
													<Link to="/courseDetails">
														PHP Development Course
														</Link>
												</h5>
												<div className="text-muted">Look, my liege! The Knights Who Say Ni demand a sacrifice!</div>
											</div>
											<div className="table-responsive">
												<table className="table table-striped table-vcenter mb-0">
													<tbody>
														<tr>
															<td className="w20"><i className="fa fa-calendar text-blue"></i></td>
															<td className="tx-medium">Duration</td>
															<td className="text-right">6 Months</td>
														</tr>
														<tr>
															<td><i className="fa fa-cc-visa text-danger"></i></td>
															<td className="tx-medium">Fees</td>
															<td className="text-right">$1,674</td>
														</tr>
														<tr>
															<td><i className="fa fa-users text-warning"></i></td>
															<td className="tx-medium">Students</td>
															<td className="text-right">125+</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className="card-footer">
												<div className="d-flex align-items-center mt-auto">
													<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar4.jpg" alt="avatar" />
													<div>
														<a >Pro. Jane</a>
														<small className="d-block text-muted">Head OF Dept.</small>
													</div>
													<div className="ml-auto text-muted">
														<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 521</a>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-4 col-md-6">
										<div className="card ribbon">
											<div className="ribbon-box orange"><i className="fa fa-star"></i></div>
											<a ><img className="card-img-top" src="../assets/images/gallery/2.jpg" alt="" /></a>
											<div className="card-body d-flex flex-column">
												<h5><Link to="/courseDetails">Account Management Course</Link></h5>
												<div className="text-muted">Look, my liege! The Knights Who Say Ni demand a sacrifice!</div>
											</div>
											<div className="table-responsive">
												<table className="table table-striped table-vcenter mb-0">
													<tbody>
														<tr>
															<td className="w20"><i className="fa fa-calendar text-blue"></i></td>
															<td className="tx-medium">Duration</td>
															<td className="text-right">1 Year</td>
														</tr>
														<tr>
															<td><i className="fa fa-cc-visa text-danger"></i></td>
															<td className="tx-medium">Fees</td>
															<td className="text-right">$1,674</td>
														</tr>
														<tr>
															<td><i className="fa fa-users text-warning"></i></td>
															<td className="tx-medium">Students</td>
															<td className="text-right">50+</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className="card-footer">
												<div className="d-flex align-items-center mt-auto">
													<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar2.jpg" alt="avatar" />
													<div>
														<a >Pro. Alan</a>
														<small className="d-block text-muted">Head OF Dept.</small>
													</div>
													<div className="ml-auto text-muted">
														<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 521</a>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-4 col-md-6">
										<div className="card">
											<a ><img className="card-img-top" src="../assets/images/gallery/3.jpg" alt="" /></a>
											<div className="card-body d-flex flex-column">
												<h5><Link to="/courseDetails">Angular Programmer Course</Link></h5>
												<div className="text-muted">Look, my liege! The Knights Who Say Ni demand a sacrifice!</div>
											</div>
											<div className="table-responsive">
												<table className="table table-striped table-vcenter mb-0">
													<tbody>
														<tr>
															<td className="w20"><i className="fa fa-calendar text-blue"></i></td>
															<td className="tx-medium">Duration</td>
															<td className="text-right">6 Months</td>
														</tr>
														<tr>
															<td><i className="fa fa-cc-visa text-danger"></i></td>
															<td className="tx-medium">Fees</td>
															<td className="text-right">$1,674</td>
														</tr>
														<tr>
															<td><i className="fa fa-users text-warning"></i></td>
															<td className="tx-medium">Students</td>
															<td className="text-right">125+</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className="card-footer">
												<div className="d-flex align-items-center mt-auto">
													<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar3.jpg" alt="avatar" />
													<div>
														<a >Pro. Jane</a>
														<small className="d-block text-muted">Head OF Dept.</small>
													</div>
													<div className="ml-auto text-muted">
														<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 521</a>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-4 col-md-6">
										<div className="card">
											<a ><img className="card-img-top" src="../assets/images/gallery/4.jpg" alt="" /></a>
											<div className="card-body d-flex flex-column">
												<h5><Link to="/courseDetails">PHP Development Course</Link></h5>
												<div className="text-muted">Look, my liege! The Knights Who Say Ni demand a sacrifice!</div>
											</div>
											<div className="table-responsive">
												<table className="table table-striped table-vcenter mb-0">
													<tbody>
														<tr>
															<td className="w20"><i className="fa fa-calendar text-blue"></i></td>
															<td className="tx-medium">Duration</td>
															<td className="text-right">6 Months</td>
														</tr>
														<tr>
															<td><i className="fa fa-cc-visa text-danger"></i></td>
															<td className="tx-medium">Fees</td>
															<td className="text-right">$1,674</td>
														</tr>
														<tr>
															<td><i className="fa fa-users text-warning"></i></td>
															<td className="tx-medium">Students</td>
															<td className="text-right">125+</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className="card-footer">
												<div className="d-flex align-items-center mt-auto">
													<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar4.jpg" alt="avatar" />
													<div>
														<a >Pro. Jane</a>
														<small className="d-block text-muted">Head OF Dept.</small>
													</div>
													<div className="ml-auto text-muted">
														<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 521</a>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-4 col-md-6">
										<div className="card">
											<a ><img className="card-img-top" src="../assets/images/gallery/5.jpg" alt="" /></a>
											<div className="card-body d-flex flex-column">
												<h5><Link to="/courseDetails">Magento Programmer Course</Link></h5>
												<div className="text-muted">Look, my liege! The Knights Who Say Ni demand a sacrifice!</div>
											</div>
											<div className="table-responsive">
												<table className="table table-striped table-vcenter mb-0">
													<tbody>
														<tr>
															<td className="w20"><i className="fa fa-calendar text-blue"></i></td>
															<td className="tx-medium">Duration</td>
															<td className="text-right">1 Year</td>
														</tr>
														<tr>
															<td><i className="fa fa-cc-visa text-danger"></i></td>
															<td className="tx-medium">Fees</td>
															<td className="text-right">$1,674</td>
														</tr>
														<tr>
															<td><i className="fa fa-users text-warning"></i></td>
															<td className="tx-medium">Students</td>
															<td className="text-right">50+</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className="card-footer">
												<div className="d-flex align-items-center mt-auto">
													<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar5.jpg" alt="avatar" />
													<div>
														<a >Pro. Corrine</a>
														<small className="d-block text-muted">Head OF Dept.</small>
													</div>
													<div className="ml-auto text-muted">
														<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 521</a>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-4 col-md-6">
										<div className="card">
											<a ><img className="card-img-top" src="../assets/images/gallery/6.jpg" alt="" /></a>
											<div className="card-body d-flex flex-column">
												<h5><Link to="/courseDetails">UI UX Design Course</Link></h5>
												<div className="text-muted">Look, my liege! The Knights Who Say Ni demand a sacrifice!</div>
											</div>
											<div className="table-responsive">
												<table className="table table-striped table-vcenter mb-0">
													<tbody>
														<tr>
															<td className="w20"><i className="fa fa-calendar text-blue"></i></td>
															<td className="tx-medium">Duration</td>
															<td className="text-right">6 Months</td>
														</tr>
														<tr>
															<td><i className="fa fa-cc-visa text-danger"></i></td>
															<td className="tx-medium">Fees</td>
															<td className="text-right">$1,674</td>
														</tr>
														<tr>
															<td><i className="fa fa-users text-warning"></i></td>
															<td className="tx-medium">Students</td>
															<td className="text-right">125+</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className="card-footer">
												<div className="d-flex align-items-center mt-auto">
													<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar6.jpg" alt="avatar" />
													<div>
														<a >Pro. Emmett</a>
														<small className="d-block text-muted">Head OF Dept.</small>
													</div>
													<div className="ml-auto text-muted">
														<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 521</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={2} className={classnames(['fade show'])}>
								<div className={`card ${isCardRemove ? 'card-remove' : ''} ${isCollapsed ? 'card-collapsed' : ''}`}>
									<div className="card-header">
										<h3 className="card-title">Department Basic Info</h3>
										<div className="card-options ">
											<a className="card-options-collapse" onClick={() => this.setState({ isCollapsed: !isCollapsed })}><i className="fe fe-chevron-up"></i></a>
											<a className="card-options-remove" onClick={() => this.setState({ isCardRemove: !isCardRemove })}><i className="fe fe-x"></i></a>
										</div>
									</div>
									<div className="card-body">
										<div className="row clearfix">
											<div className="col-sm-6">
												<div className="form-group">
													<input type="text" className="form-control" placeholder="Department Name " />
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<input type="text" className="form-control" placeholder="Head of Department" />
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<input type="number" className="form-control" placeholder="No. of Students " />
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<DatePicker
														placeholderText="Department Start Date"
														className="form-control"
													/>
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<textarea rows="4" className="form-control no-resize" placeholder="Brief"></textarea>
												</div>
											</div>
											<div className="col-sm-12">
												<button type="submit" className="mr-1 btn btn-primary">Submit</button>
												<button type="submit" className="btn btn-outline-secondary btn-default">Cancel</button>
											</div>
										</div>
									</div>
								</div>
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">Staff Member Account Info</h3>
										<div className="card-options ">
											<a className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a>
											<a className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a>
										</div>
									</div>
									<div className="card-body">
										<div className="row clearfix">
											<div className="col-sm-12">
												<div className="form-group">
													<input type="text" className="form-control" placeholder="Email" />
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<input type="text" className="form-control" placeholder="Phone" />
												</div>
											</div>
											<div className="col-sm-12">
												<button type="submit" className="mr-1 btn btn-primary">Submit</button>
												<button type="submit" className="btn btn-outline-secondary btn-default">Cancel</button>
											</div>
										</div>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={3} className={classnames(['fade show'])}>
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">Add Department</h3>
										<div className="card-options ">
											<a className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a>
											<a className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a>
										</div>
									</div>
									<form className="card-body">
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Department Name <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Head Of Department</label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Department Start Date <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<DatePicker
													className="form-control"
												/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Student Capacity <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Department Details <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<textarea rows="4" className="form-control no-resize" placeholder="Please type what you want..."></textarea>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label"></label>
											<div className="col-md-7">
												<button type="submit" className="mr-1 btn btn-primary">Submit</button>
												<button type="submit" className="btn btn-outline-secondary">Cancel</button>
											</div>
										</div>
									</form>
								</div>
							</TabPane>
						</TabContent>
					</div>
				</div>
			</>
		);
	}
}



