import React, { Component } from 'react';
import ToolTip from "../../common/toolTip";
import SweetAlert from 'sweetalert2-react';

export default class Leave extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
	}
	render() {
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">Leave</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a>Amiruddaula Islamia Degree College</a></li>
									<li className="breadcrumb-item active" aria-current="page">Leave</li>
								</ol>
							</div>
							<a className="btn btn-info btn-sm">Export Excel</a>
						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container-fluid">
						<div className="row">
							<div className="col-12">
								<div className="card">
									<div className="table-responsive">
										<table className="table table-hover table-striped table-vcenter text-nowrap mb-0">
											<thead>
												<tr>
													<th>#</th>
													<th>Name</th>
													<th>Student ID</th>
													<th>Date</th>
													<th>Leave Reason</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="width45">
														<ToolTip id="db" text="Avtar Name" />
														<span className="avatar avatar-orange" data-tip data-for='db' title="">DB</span>
													</td>
													<td><div className="font-15">Marshall Nichols</div></td>
													<td><span>LA-8150</span></td>
													<td>24 July, 2019 to 26 July, 2019</td>
													<td>Going to Family Function</td>
													<td>
														<button type="button" className="btn btn-icon btn-sm" title="Approved"><i className="fa fa-check text-success"></i></button>
														<button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button>
													</td>
												</tr>
												<tr>
													<td className="width45">
														<ToolTip id="gc" text="Avtar Name" />
														<span className="avatar avatar-pink" data-tip data-for='gc' title="">GC</span>
													</td>
													<td><div className="font-15">Gary Camara</div></td>
													<td><span>LA-8795</span></td>
													<td>20 July, 2019 to 26 July, 2019</td>
													<td>Going to Development</td>
													<td>
														<button type="button" className="btn btn-icon btn-sm" title="Approved"><i className="fa fa-check text-success"></i></button>
														<button type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button>
													</td>
												</tr>
												<tr>
													<td className="width45">
														<ToolTip id="avtar" text="Avtar Name" />
														<img className="avatar" src="../assets/images/xs/avatar1.jpg" data-tip data-for='avtar' title="" alt="Avatar" />
													</td>
													<td><div className="font-15">Maryam Amiri</div></td>
													<td><span>LA-0258</span></td>
													<td>21 July, 2019 to 26 July, 2019</td>
													<td>Attend Birthday party</td>
													<td>
														<button type="button" className="btn btn-icon btn-sm" title="Approved"><i className="fa fa-check text-success"></i></button>
														<button type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button>
													</td>
												</tr>
												<tr>
													<td className="width45">
														<ToolTip id="4" text="Avtar Name" />
														<img className="avatar" src="../assets/images/xs/avatar2.jpg" alt="avtarImage" data-tip data-for="4" />
													</td>
													<td><div className="font-15">Frank Camly</div></td>
													<td><span>LA-1515</span></td>
													<td>11 Aug, 2019 to 21 Aug, 2019</td>
													<td>Going to Holiday</td>
													<td>
														<button type="button" className="btn btn-icon btn-sm" title="Approved"><i className="fa fa-check text-success"></i></button>
														<button type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button>
													</td>
												</tr>
												<tr>
													<td className="width45">
														<ToolTip id="5" text="Avtar Name" />
														<span className="avatar avatar-blue" data-tip data-for="5">DB</span>
													</td>
													<td><div className="font-15">Marshall Nichols</div></td>
													<td><span>LA-8150</span></td>
													<td>24 July, 2019 to 26 July, 2019</td>
													<td>Going to Family Function</td>
													<td>
														<button type="button" className="btn btn-icon btn-sm" title="Approved"><i className="fa fa-check text-success"></i></button>
														<button type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button>
													</td>
												</tr>
												<tr>
													<td className="width45">
														<ToolTip id="6" text="Avtar Name" />
														<img className="avatar" src="../assets/images/xs/avatar2.jpg" alt="avtarImage" data-tip data-for="6" />
													</td>
													<td><div className="font-15">Frank Camly</div></td>
													<td><span>LA-1515</span></td>
													<td>11 Aug, 2019 to 21 Aug, 2019</td>
													<td>Going to Holiday</td>
													<td>
														<button type="button" className="btn btn-icon btn-sm" title="Approved"><i className="fa fa-check text-success"></i></button>
														<button type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button>
													</td>
												</tr>
												<tr>
													<td className="width45">
														<ToolTip id="7" text="Avtar Name" />
														<span className="avatar avatar-green" data-tip data-for="7">GC</span>
													</td>
													<td><div className="font-15">Gary Camara</div></td>
													<td><span>LA-8795</span></td>
													<td>20 July, 2019 to 26 July, 2019</td>
													<td>Going to Development</td>
													<td>
														<button type="button" className="btn btn-icon btn-sm" title="Approved"><i className="fa fa-check text-success"></i></button>
														<button type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button>
													</td>
												</tr>
												<tr>
													<td className="width45">
														<ToolTip id="8" text="Avtar Name" />
														<img className="avatar" src="../assets/images/xs/avatar1.jpg" data-tip data-for="8" alt="avtarImage"/>
													</td>
													<td><div className="font-15">Maryam Amiri</div></td>
													<td><span>LA-0258</span></td>
													<td>21 July, 2019 to 26 July, 2019</td>
													<td>Attend Birthday party</td>
													<td>
														<button type="button" className="mr-1 btn btn-icon btn-sm" title="Approved"><i className="fa fa-check text-success"></i></button>
														<button type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button>
													</td>
												</tr>
											</tbody>
										</table>
										<SweetAlert
											show={this.state.show}
											title="Are you sure?"
											text="You will not be able to recover this imaginary file!"
											type="warning"
											showCancelButton={true}
											confirmButtonColor="#dc3545"
											confirmButtonText="Yes, delete it!"
											closeOnConfirm={false}
											onConfirm={() => this.setState({ show: false })}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}



